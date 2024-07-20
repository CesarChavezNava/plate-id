import { User } from '../entities';

export interface UserRepository {
  findBy(email: string): Promise<User>;
  findById(userId: string): Promise<User>;
  create(user: User): Promise<string>;
  update(userId: string, user: User): Promise<void>;
}
