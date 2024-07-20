import { Inject, Injectable } from '@nestjs/common';
import { Dish } from '../domain/entities';
import { DishRepository } from '../domain/ports/dish.repository';

export interface ForCreatingDish {
  execute(dish: Dish): Promise<void>;
}

@Injectable()
export class DishCreator implements ForCreatingDish {
  constructor(
    @Inject('DishRepository') private readonly dishRepository: DishRepository,
  ) {}

  async execute(dish: Dish): Promise<void> {
    await this.dishRepository.create(dish);
  }
}
