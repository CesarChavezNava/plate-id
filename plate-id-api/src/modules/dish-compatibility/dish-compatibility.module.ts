import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { DishCompatibilityIAAdapter } from './infrastructure/adapters/ia/dish-compatibility-ia.adapter';
import { CalcCompatibility } from './application';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: 'DishCompatibilityIAPort',
      useClass: DishCompatibilityIAAdapter,
    },
    CalcCompatibility,
  ],
  exports: [CalcCompatibility],
})
export class DishCompatibilityModule {}
