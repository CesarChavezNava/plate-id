import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { CompatibilityUseCasesProviders } from './application';
import { CompatibilityAdaptersProviders } from './infrastructure/adapters';

@Module({
  imports: [SharedModule],
  providers: [
    ...CompatibilityAdaptersProviders,
    ...CompatibilityUseCasesProviders,
  ],
  exports: [...CompatibilityUseCasesProviders],
})
export class CompatibilityModule {}
