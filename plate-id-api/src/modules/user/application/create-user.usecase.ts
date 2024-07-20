import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/ports/user.repository';
import { User } from '../domain/entities';
import { UserAlreadyExists } from '../domain/errors';

export interface ForCreatingUser {
  execute(user: User): Promise<string>;
}

@Injectable()
export class UserCreator implements ForCreatingUser {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(user: User): Promise<string> {
    const foundUser = await this.userRepository.findBy(user.email);
    if (foundUser) {
      throw new UserAlreadyExists(user.email);
    }

    return await this.userRepository.create(user);
  }
}
