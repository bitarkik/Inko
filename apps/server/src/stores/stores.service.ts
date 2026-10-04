import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Resend } from 'resend';

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
    return this.prisma.store.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        address: true,
        contactNumber: true,
        email: true,
        latitude: true,
        longitude: true,
        isAcceptingOrders: true,
        status: true,
      }
    });
  }

  async checkStatus(storeId: string, phone: string) {
    const store = await this.prisma.store.findFirst({
      where: { id: storeId, contactNumber: phone },
      select: { status: true },
    });
    if (!store) {
      throw new NotFoundException(
        'Store not found or phone number does not match',
      );
    }
    return store;
  }

  async create(data: any) {
    const store = await this.prisma.store.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (store.email) {
        resend.emails
          .send({
            from: 'hello@printitbyinko.com',
            to: store.email,
            subject: 'Application Received - PrintIt by Inko Partner',
            html: `
            <h3>Application Received!</h3>
            <p>Hi ${store.ownerName},</p>
            <p>We have received your application for <strong>${store.name}</strong>.</p>
            <p>Your Store ID is: <strong>${store.id}</strong></p>
            <p>While we review your application, please download and install the PrintIt by Inko Agent on your store's computer:</p>
            <p><a href="https://github.com/bitarkik/Inko/releases/latest/download/PrintIt-by-Inko-Agent-Setup.exe">Download PrintIt by Inko Agent</a></p>
            <p><strong>Setup Steps:</strong></p>
            <ol>
              <li>Install the agent.</li>
              <li>Open it and enter your Store ID (${store.id}).</li>
              <li>Keep the agent running in the background.</li>
            </ol>
            <p>We will notify you once your store is approved and active.</p>
          `,
          })
          .catch((err) =>
            console.error('Failed to send signup email to store owner', err),
          );
      }

      resend.emails
        .send({
          from: 'hello@printitbyinko.com',
          to: 'info@printitbyinko.com',
          subject: 'New Partner Application - ' + store.name,
          html: `
          <h3>New Partner Application</h3>
          <p><strong>Store Name:</strong> ${store.name}</p>
          <p><strong>Store ID:</strong> ${store.id}</p>
          <p><strong>Owner:</strong> ${store.ownerName}</p>
          <p><strong>Phone:</strong> ${store.contactNumber}</p>
          <p><strong>Email:</strong> ${store.email || 'N/A'}</p>
          <p><strong>Address:</strong> ${store.address}</p>
        `,
        })
        .catch((err) =>
          console.error('Failed to send signup email to admin', err),
        );
    }

    return store;
  }

  async toggleAcceptingOrders(storeId: string, isAccepting: boolean) {
    return this.prisma.store.update({
      where: { id: storeId },
      data: { isAcceptingOrders: isAccepting },
    });
  }

  async setupAgent(setupCode: string) {
    const codeRec = await this.prisma.setupCode.findUnique({
      where: { code: setupCode },
      include: { store: true }
    });

    if (!codeRec) {
      throw new NotFoundException('Invalid setup code');
    }

    if (codeRec.expiresAt < new Date()) {
      throw new NotFoundException('Setup code has expired');
    }

    const { randomBytes } = require('crypto');
    const token = randomBytes(32).toString('hex'); // 64 char token

    const deviceToken = await this.prisma.deviceToken.create({
      data: {
        token,
        storeId: codeRec.storeId,
      }
    });

    await this.prisma.setupCode.delete({
      where: { id: codeRec.id }
    });

    return {
      token: deviceToken.token,
      storeId: codeRec.store.id,
      storeName: codeRec.store.name,
    };
  }

  
  async revokeDeviceToken(tokenId: string, storeId: string) {
    const token = await this.prisma.deviceToken.findUnique({ where: { id: tokenId } });
    if (!token || token.storeId !== storeId) {
      throw new NotFoundException('Device token not found for this store');
    }
    await this.prisma.deviceToken.delete({ where: { id: tokenId } });
    return { success: true };
  }

  async generatePairingCode(storeId: string) {
    const { randomInt } = require('crypto');
    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await this.prisma.setupCode.create({
      data: { code, storeId, expiresAt }
    });

    return { code, expiresAt };
  }
}
