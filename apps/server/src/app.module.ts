import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { BullModule } from '@nestjs/bullmq';
import { DocumentAnalysisModule } from './document-analysis/document-analysis.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DocumentAnalysisModule,
    StoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
