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

  async getReadyToPrintOrder(storeId: string) {
    return this.prisma.order.findFirst({
      where: { 
        status: 'READY_TO_PRINT',
        storeId 
      },
      orderBy: { createdAt: 'asc' },
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
