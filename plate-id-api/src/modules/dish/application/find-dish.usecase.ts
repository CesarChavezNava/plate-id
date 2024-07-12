import { Inject, Injectable } from '@nestjs/common';
import { DishRepository } from '../domain/repositories/dish.repository';
import { Dish } from '../domain/entities';

@Injectable()
export class FindDish {
  constructor(
    @Inject('DishRepository') private readonly dishRepository: DishRepository,
  ) {}

  async execute(name: string): Promise<Dish> {
    return await this.dishRepository.findBy(name);
  }
}
