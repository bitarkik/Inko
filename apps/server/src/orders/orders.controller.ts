import { Controller, Post, Body, Param, Patch, Get, UseInterceptors, UploadedFile, Res, StreamableFile, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('document', { dest: './uploads' }))
  createOrder(
    @UploadedFile() file: Express.Multer.File,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(createOrderDto, file.path);
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

  @Get('ready-to-print')
  getReadyToPrintOrder(@Query('storeId') storeId: string) {
    if (!storeId) {
      throw new BadRequestException('storeId query parameter is required');
    }
    return this.ordersService.getReadyToPrintOrder(storeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get(':id/download')
  async downloadOrderFile(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const order = await this.ordersService.findOne(id);
    if (!order || !order.fileUrl) {
      throw new NotFoundException('File not found for this order');
    }

    const file = createReadStream(join(process.cwd(), order.fileUrl));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="order-${id}.pdf"`,
    });
    return new StreamableFile(file);
  }
}
