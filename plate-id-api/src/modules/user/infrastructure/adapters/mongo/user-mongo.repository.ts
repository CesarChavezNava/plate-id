import { Model, Types } from 'mongoose';
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

  async findById(userId: string): Promise<User> {
    const objectId = new Types.ObjectId(userId);
    const user = await this.userModel.findById({ _id: objectId }).exec();
    return user ? user.toObject() : undefined;
  }

  async create(user: User): Promise<string> {
    const userCreated = new this.userModel({
      _id: new Types.ObjectId(),
      email: user.email,
      preferences: user.preferences,
    });
    const savedUser = await userCreated.save();

    return savedUser._id.toString();
  }

  async update(userId: string, user: Partial<User>): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, user, { new: true });
  }
}
