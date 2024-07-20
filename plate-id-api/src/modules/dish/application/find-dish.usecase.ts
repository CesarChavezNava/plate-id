import { Inject, Injectable } from '@nestjs/common';
import { DishRepository } from '../domain/ports/dish.repository';
import { Dish } from '../domain/entities';

export interface ForFindingDish {
  execute(name: string): Promise<Dish>;
}

@Injectable()
export class DishFinder implements ForFindingDish {
  constructor(
    @Inject('DishRepository') private readonly dishRepository: DishRepository,
  ) {}

  async execute(name: string): Promise<Dish> {
    return await this.dishRepository.findBy(name);
  }
}
