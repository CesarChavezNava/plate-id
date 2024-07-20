import { Inject, Injectable } from '@nestjs/common';
import {
  ForCreatingUser,
  ForFindingUser,
  ForUpdatingUserPreferences,
} from '../../modules/user/application';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { User } from '../../modules/user/domain/entities';

@Injectable()
export class UserService {
  constructor(
    @Inject('ForCreatingUser')
    private readonly userCreator: ForCreatingUser,
    @Inject('ForUpdatingUserPreferences')
    private readonly userPreferencesUpdater: ForUpdatingUserPreferences,
    @Inject('ForFindingUser')
    private readonly userFinder: ForFindingUser,
  ) {}

  async create(dto: CreateUserDto): Promise<string> {
    return await this.userCreator.execute(new User(dto.email, dto.preferences));
  }

  async updatePreferences(userId: string, dto: UpdateUserDto): Promise<void> {
    await this.userPreferencesUpdater.execute(userId, dto.preferences);
  }

  async find(userId: string): Promise<User> {
    return await this.userFinder.execute(userId);
  }
}
