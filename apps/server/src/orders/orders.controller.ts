import { Controller, Post, Body, Param, Patch, Get, UseInterceptors, UploadedFile, Res, StreamableFile, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multerS3 from 'multer-s3';

// Initialize S3 client for Cloudflare R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('document', {
    storage: multerS3({
      s3: s3,
      bucket: process.env.R2_BUCKET_NAME || 'printpanda-uploads',
      key: function (req: any, file: any, cb: any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'orders/' + uniqueSuffix + '-' + file.originalname);
      }
    })
  }))
  async createOrder(
    @UploadedFile() file: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      console.log('[DEBUG] File received:', JSON.stringify(file));
      console.log('[DEBUG] DTO received:', JSON.stringify(createOrderDto));
      if (!file) {
        throw new Error('No file uploaded — multer-s3 did not attach a file object');
      }
      return await this.ordersService.createOrder(createOrderDto, file.key || file.location);
    } catch (err: any) {
      console.error('[ERROR] createOrder failed:', err?.message, err?.stack);
      throw err;
    }
  }

  @Patch(':id/status')
  updatePrintingStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updatePrintingStatus(id, updateOrderStatusDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('me')
  getMyOrders(@Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId query parameter is required');
    }
    return this.ordersService.getOrdersByUser(userId);
  }

  @Get('ready-to-print')
  getReadyToPrintOrders(@Query('storeId') storeId: string) {
    if (!storeId) {
      throw new BadRequestException('storeId query parameter is required');
    }
    return this.ordersService.getReadyToPrintOrders(storeId);
  }

  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }

  @Get('history')
  getHistory(@Query('storeId') storeId: string, @Query('days') days?: string) {
    if (!storeId) {
      throw new BadRequestException('storeId query parameter is required');
    }
    const daysInt = days ? parseInt(days, 10) : 30;
    return this.ordersService.getHistory(storeId, daysInt);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get(':id/download')
  async downloadOrderFile(@Param('id') id: string, @Res() res: Response) {
    const order = await this.ordersService.findOne(id);
    if (!order || !order.fileUrl) {
      throw new NotFoundException('File not found for this order');
    }

    if (order.fileUrl.startsWith('orders/')) {
       // It's an R2 key, generate a short-lived presigned URL
       const command = new GetObjectCommand({
         Bucket: process.env.R2_BUCKET_NAME || 'printpanda-uploads',
         Key: order.fileUrl,
         ResponseContentDisposition: `inline; filename="order-${id}.pdf"`,
         ResponseContentType: 'application/pdf',
       });
       
       try {
         const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
         return res.redirect(url);
       } catch (error) {
         console.error('Error generating presigned URL:', error);
         throw new BadRequestException('Could not access document file');
       }
    } else {
       // Legacy local files (if any still exist)
       const file = createReadStream(join(process.cwd(), order.fileUrl));
       res.set({
         'Content-Type': 'application/pdf',
         'Content-Disposition': `inline; filename="order-${id}.pdf"`,
       });
       file.pipe(res);
    }
  }
}
