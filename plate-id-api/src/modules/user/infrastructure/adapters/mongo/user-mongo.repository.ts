import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities';
import { UserModel } from './models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserModel>,
  ) {}

  async findBy(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user.toObject() : undefined;
  }

  async create(user: User): Promise<void> {
    const userCreated = new this.userModel(user);
    await userCreated.save();
  }
}
