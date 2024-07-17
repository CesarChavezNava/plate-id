import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities';
import { UserNotFound } from '../domain/errors';

@Injectable()
export class UpdateUser {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, user: User): Promise<void> {
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new UserNotFound(userId);
    }

    await this.userRepository.update(userId, user);
  }
}
