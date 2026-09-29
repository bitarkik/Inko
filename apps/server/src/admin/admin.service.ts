import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Resend } from 'resend';

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
        ownerName: store.ownerName,
        contactNumber: store.contactNumber,
        email: store.email,
        latitude: store.latitude,
        longitude: store.longitude,
        createdAt: store.createdAt,
        lastPingAt: store.lastPingAt,
        isActive,
        status: store.status,
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

  async approveStore(storeId: string) {
    const store = await this.prisma.store.update({
      where: { id: storeId },
      data: { status: 'ACTIVE' },
    });
    
    if (store.email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails.send({
        from: 'hello@printitbyinko.com',
        to: store.email,
        subject: 'Your PrintPanda Shop is Live!',
        html: `
          <h3>Congratulations!</h3>
          <p>Hi ${store.ownerName},</p>
          <p>Your store <strong>${store.name}</strong> has been approved and is now ACTIVE.</p>
          <p>If you haven't already, please ensure the PrintPanda Agent is running on your desktop with your Store ID: <strong>${store.id}</strong>.</p>
          <p>You are now ready to receive print orders from customers.</p>
        `
      }).catch(err => console.error("Failed to send approval email", err));
    }
    
    return store;
  }
}
