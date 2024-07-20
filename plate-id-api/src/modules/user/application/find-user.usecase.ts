import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/ports/user.repository';
import { User } from '../domain/entities';
import { UserNotFound } from '../domain/errors';

export interface ForFindingUser {
  execute(userId: string): Promise<User>;
}

@Injectable()
export class UserFinder implements ForFindingUser {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFound(userId);
    }

    return user;
  }
}
