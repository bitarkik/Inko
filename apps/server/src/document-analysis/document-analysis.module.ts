import { Module } from '@nestjs/common';
import { DocumentAnalysisProcessor } from './document-analysis.processor';

@Module({
  providers: [DocumentAnalysisProcessor],
})
export class DocumentAnalysisModule {}
