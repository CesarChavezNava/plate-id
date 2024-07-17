import { Injectable } from '@nestjs/common';
import {
  CreateUser,
  FindUser,
  UpdateUser,
} from '../../modules/user/application';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { User } from '../../modules/user/domain/entities';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly findUser: FindUser,
  ) {}

  async create(dto: CreateUserDto): Promise<string> {
    return await this.createUser.execute(new User(dto.email, dto.preferences));
  }

  async update(userId: string, dto: UpdateUserDto): Promise<void> {
    await this.updateUser.execute(userId, User.addPreferences(dto.preferences));
  }

  async find(userId: string): Promise<User> {
    return await this.findUser.execute(userId);
  }
}
