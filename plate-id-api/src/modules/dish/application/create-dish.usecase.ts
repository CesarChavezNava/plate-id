import { Inject, Injectable } from '@nestjs/common';
import { Dish } from '../domain/entities';
import { DishRepository } from '../domain/repositories/dish.repository';

@Injectable()
export class CreateDish {
  constructor(
    @Inject('DishRepository') private readonly dishRepository: DishRepository,
  ) {}

  async execute(dish: Dish): Promise<void> {
    await this.dishRepository.create(dish);
  }
}
