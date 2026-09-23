import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { BullModule } from '@nestjs/bullmq';
import { DocumentAnalysisModule } from './document-analysis/document-analysis.module';
import { StoresModule } from './stores/stores.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    BullModule.forRoot({
      connection: process.env.REDIS_URL ? {
        host: new URL(process.env.REDIS_URL).hostname,
        port: Number(new URL(process.env.REDIS_URL).port),
        username: new URL(process.env.REDIS_URL).username || undefined,
        password: new URL(process.env.REDIS_URL).password || undefined,
      } : {
        host: 'localhost',
        port: 6379,
      },
    }),
    DocumentAnalysisModule,
    StoresModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
