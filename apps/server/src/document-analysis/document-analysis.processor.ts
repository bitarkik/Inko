import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';

@Processor('document-analysis')
export class DocumentAnalysisProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { orderId } = job.data;
    
    // Update to PROCESSING
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PROCESSING' },
    });

    // Simulate 3-second delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Transition to READY_TO_PRINT
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'READY_TO_PRINT' },
    });
  }
}
