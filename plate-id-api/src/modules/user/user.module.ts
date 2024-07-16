import { Module } from '@nestjs/common';
import { UserPreferencesIAAdapter } from './infrastructure/adapters/ia/user-preferences-ia.adapter';
import { CalculateCompatibility } from './application/calculate-compatibility.usecase';
import { SharedModule } from '../shared/shared.module';
import { UserProviders } from './infrastructure/adapters/mongo/user.providers';
import { UserMongoRepository } from './infrastructure/adapters/mongo/user-mongo.repository';
import { CreateUser } from './application';
import { DatabaseModule } from '../shared/database.module';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [
    ...UserProviders,
    {
      provide: 'UserPreferencesIAPort',
      useClass: UserPreferencesIAAdapter,
    },
    {
      provide: 'UserRepository',
      useClass: UserMongoRepository,
    },
    CreateUser,
    CalculateCompatibility,
  ],
  exports: [CalculateCompatibility, CreateUser],
})
export class UserModule {}
