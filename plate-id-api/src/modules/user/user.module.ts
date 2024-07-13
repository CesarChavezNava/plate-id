import { Module } from '@nestjs/common';
import { UserPreferencesIAAdapter } from './infrastructure/adapters/ia/user-preferences-ia.adapter';
import { CalculateCompatibility } from './application/calculate-compatibility.usecase';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: 'UserPreferencesIAPort',
      useClass: UserPreferencesIAAdapter,
    },
    CalculateCompatibility,
  ],
  exports: [CalculateCompatibility],
})
export class UserModule {}
