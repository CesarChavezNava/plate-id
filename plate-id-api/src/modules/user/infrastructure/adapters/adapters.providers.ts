import { MongoUserRepository } from './mongo/mongo-user.repository';

export const UserAdapterProviders = [
  {
    provide: 'UserRepository',
    useClass: MongoUserRepository,
  },
];
