import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities';
import { UserAlreadyExists } from '../domain/errors';

@Injectable()
export class CreateUser {
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
