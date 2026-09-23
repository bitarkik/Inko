import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    const recentOrders = await this.prisma.order.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const completedJobs = await this.prisma.order.count({
      where: { storeId, status: 'COMPLETED' },
    });

    const revenueAggregation = await this.prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: { storeId, status: 'COMPLETED' },
    });

    return {
      store,
      recentOrders,
      analytics: {
        totalRevenue: revenueAggregation._sum?.totalPrice || 0,
        completedJobs,
      },
    };
  }

  async findAll() {
    return this.prisma.store.findMany();
  }

  async create(data: { id: string; name: string; address: string; basePrice: number }) {
    return this.prisma.store.create({
      data,
    });
  }

  async toggleAcceptingOrders(storeId: string, isAccepting: boolean) {
    return this.prisma.store.update({
      where: { id: storeId },
      data: { isAcceptingOrders: isAccepting },
    });
  }
}
