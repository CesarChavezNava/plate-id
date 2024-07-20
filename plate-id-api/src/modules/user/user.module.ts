import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MongoUserProviders } from './infrastructure/adapters/mongo/mongo-user.provider';
import { UserUseCasesProviders } from './application';
import { DatabaseModule } from '../shared/database.module';
import { UserAdapterProviders } from './infrastructure/adapters';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [
    ...MongoUserProviders,
    ...UserAdapterProviders,
    ...UserUseCasesProviders,
  ],
  exports: [...UserUseCasesProviders],
})
export class UserModule {}
