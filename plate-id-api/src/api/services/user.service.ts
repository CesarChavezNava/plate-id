import { Injectable } from '@nestjs/common';
import { CreateUser, UpdateUser } from '../../modules/user/application';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { User } from '../../modules/user/domain/entities';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
  ) {}

  async create(dto: CreateUserDto): Promise<string> {
    return await this.createUser.execute(new User(dto.email, dto.preferences));
  }

  async update(userId: string, dto: UpdateUserDto): Promise<void> {
    await this.updateUser.execute(userId, User.addPreferences(dto.preferences));
  }
}
