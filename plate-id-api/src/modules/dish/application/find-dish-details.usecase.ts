import { Inject, Injectable } from '@nestjs/common';
import { DishAIService } from '../domain/ports/dish-ai.service';
import { Dish } from '../domain/entities';

export interface ForFindingDishDetails {
  execute(dishName: string): Promise<Dish>;
}

@Injectable()
export class DishDetailsFinder implements ForFindingDishDetails {
  constructor(
    @Inject('DishAIService') private readonly dishAIService: DishAIService,
  ) {}

  async execute(dishName: string): Promise<Dish> {
    return await this.dishAIService.findDishDetails(dishName);
  }
}
