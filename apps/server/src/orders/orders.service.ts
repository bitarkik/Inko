import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('document-analysis') private documentAnalysisQueue: Queue,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, fileUrl: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: createOrderDto.storeId },
    });
    
    if (!store) {
      throw new NotFoundException(`Store with ID ${createOrderDto.storeId} not found`);
    }
    
    if (!store.isAcceptingOrders) {
      throw new Error('Sorry, this shop is not accepting orders right now.');
    }

    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        fileUrl,
      },
    });

    await this.documentAnalysisQueue.add('analyze-document', {
      orderId: order.id,
    });

    return order;
  }

  async updatePrintingStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: updateOrderStatusDto.status },
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async getReadyToPrintOrders(storeId: string) {
    // Silently update the last ping timestamp for this store
    await this.prisma.store.update({
      where: { id: storeId },
      data: { lastPingAt: new Date() },
    });

    return this.prisma.order.findMany({
      where: { 
        status: 'READY_TO_PRINT',
        storeId 
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getHistory(storeId: string, days: number = 7) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    return this.prisma.order.findMany({
      where: {
        storeId,
        status: { in: ['READY_TO_PICKUP', 'COMPLETED'] },
        createdAt: { gte: date }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
