import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/ports/user.repository';
import { User } from '../domain/entities';
import { UserNotFound } from '../domain/errors';
import { Preferences } from '../../shared/domain/entities';

export interface ForUpdatingUserPreferences {
  execute(userId: string, preferences: Preferences);
}

@Injectable()
export class UserPreferencesUpdater implements ForUpdatingUserPreferences {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, preferences: Preferences): Promise<void> {
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new UserNotFound(userId);
    }

    await this.userRepository.update(userId, User.addPreferences(preferences));
  }
}
