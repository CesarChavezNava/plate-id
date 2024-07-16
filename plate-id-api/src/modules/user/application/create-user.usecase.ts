import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities';

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(user: User): Promise<User> {
    const foundUser = await this.userRepository.findBy(user.email);
    if (foundUser) {
      return foundUser;
    }

    await this.userRepository.create(user);
    return user;
  }
}
