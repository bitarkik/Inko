import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getPlatformStats() {
    const stores = await this.prisma.store.findMany({
      include: {
        orders: {
          where: { status: 'COMPLETED' },
          select: { totalPrice: true, totalPages: true, colorPages: true, bwPages: true }
        }
      }
    });

    let totalRevenue = 0;
    let totalCompletedJobs = 0;
    let totalColorPages = 0;
    let totalBwPages = 0;

    const storesStats = stores.map(store => {
      let storeRevenue = 0;
      let storeJobs = 0;

      store.orders.forEach(order => {
        storeRevenue += Number(order.totalPrice || 0);
        storeJobs += 1;
        totalColorPages += order.colorPages.length;
        totalBwPages += order.bwPages.length;
      });

      totalRevenue += storeRevenue;
      totalCompletedJobs += storeJobs;

      // Determine active status: if pinged within last 2 minutes (120000 ms)
      const isActive = store.lastPingAt && (new Date().getTime() - new Date(store.lastPingAt).getTime() < 120000);

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        createdAt: store.createdAt,
        lastPingAt: store.lastPingAt,
        isActive,
        revenue: storeRevenue,
        completedJobs: storeJobs,
      };
    });

    // Sort top performers by revenue
    const topPerformers = [...storesStats].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    return {
      platformStats: {
        totalRevenue,
        totalCompletedJobs,
        totalColorPages,
        totalBwPages,
      },
      topPerformers,
      allStores: storesStats,
    };
  }
}
