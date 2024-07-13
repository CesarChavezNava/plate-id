import { Module } from '@nestjs/common';
import { IAMapper } from './infrastructure/ia/ia.mapper';

@Module({
  providers: [IAMapper],
  exports: [IAMapper],
})
export class SharedModule {}
