import { Module } from '@nestjs/common';
import { AIMapper } from './infrastructure/ai/ai.mapper';

@Module({
  providers: [AIMapper],
  exports: [AIMapper],
})
export class SharedModule {}
