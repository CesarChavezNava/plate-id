import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserProviders } from './infrastructure/adapters/mongo/user.providers';
import { UserMongoRepository } from './infrastructure/adapters/mongo/user-mongo.repository';
import { CreateUser, FindUser, UpdateUser } from './application';
import { DatabaseModule } from '../shared/database.module';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [
    ...UserProviders,
    {
      provide: 'UserRepository',
      useClass: UserMongoRepository,
    },
    CreateUser,
    UpdateUser,
    FindUser,
  ],
  exports: [CreateUser, UpdateUser, FindUser],
})
export class UserModule {}
