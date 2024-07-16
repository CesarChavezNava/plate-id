import { Injectable } from '@nestjs/common';
import { CreateUser } from '../../modules/user/application';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Preferences, User } from '../../modules/user/domain/entities';

@Injectable()
export class UserService {
  constructor(private readonly createUser: CreateUser) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.createUser.execute(
      new User(
        dto.email,
        new Preferences(
          dto.preferences.favoriteIngredients ?? [],
          dto.preferences.dislikedIngredients ?? [],
          dto.preferences.dietaryRestrictions ?? [],
        ),
      ),
    );
  }
}
