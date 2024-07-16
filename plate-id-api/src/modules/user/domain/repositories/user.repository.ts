import { User } from '../entities';

export interface UserRepository {
  findBy(email: string): Promise<User>;
  create(user: User): Promise<void>;
}
