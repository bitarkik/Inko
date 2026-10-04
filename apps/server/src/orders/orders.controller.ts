import {
  UseGuards,
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { memoryStorage } from 'multer';

// Initialize S3 client for Cloudflare R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  // R2's edge has no TLS cert for <bucket>.<account>.r2.cloudflarestorage.com,
  // so virtual-hosted-style URLs fail the TLS handshake (alert 40).
  // Path style keeps the hostname at <account>.r2.cloudflarestorage.com.
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  requestHandler: undefined,
});

import { AgentGuard } from '../auth/agent.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('document', {
      storage: memoryStorage(),
      limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
    }),
  )
  async createOrder(
    @UploadedFile() file: Express.Multer.File,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    if (!file) {
      throw new BadRequestException('No document file uploaded');
    }

    try {
      // Upload buffer to R2 manually
      const key = `orders/${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
      console.log('[R2] Uploading file to key:', key);

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME || 'printpanda-uploads',
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      console.log('[R2] Upload successful');
      return this.ordersService.createOrder(createOrderDto, key);
    } catch (err: any) {
      console.error('[R2] Upload failed:', err?.message, err?.code);
      throw new InternalServerErrorException(
        'Failed to upload document: ' + err?.message,
      );
    }
  }

  @Patch(':id/status')
  @UseGuards(AgentGuard)
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
  @UseGuards(AgentGuard)
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
  @UseGuards(AgentGuard)
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
  @UseGuards(AgentGuard)
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
      const filePath = join(process.cwd(), order.fileUrl);
      if (!existsSync(filePath)) {
        throw new NotFoundException('Local document file not found');
      }
      
      const file = createReadStream(filePath);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="order-${id}.pdf"`,
      });
      file.pipe(res);
    }
  }
}
