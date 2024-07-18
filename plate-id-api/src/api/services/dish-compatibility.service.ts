import { Injectable } from '@nestjs/common';
import {
  CreateDish,
  FindDish,
  GetDishDetails,
  RecognizeDish,
} from '../../modules/dish/application';
import { Dish } from '../../modules/dish/domain/entities';
import { CalcCompatibility } from '../../modules/dish-compatibility/application';
import { Preferences } from '../../modules/shared/domain/entities';

@Injectable()
export class DishCompatibilityService {
  constructor(
    private readonly recognizeDish: RecognizeDish,
    private readonly findDish: FindDish,
    private readonly createDish: CreateDish,
    private readonly getDishDetails: GetDishDetails,
    private readonly calcCompatibility: CalcCompatibility,
  ) {}

  async search(image: Buffer, preferences: Preferences): Promise<Dish> {
    const name = await this.recognizeDish.execute(image);
    let dish = await this.findDish.execute(name);

    const scoreCompatibility = await this.calcCompatibility.execute(
      name,
      preferences,
    );

    if (dish) {
      dish.scores.push(scoreCompatibility);
      return dish;
    }

    dish = await this.getDishDetails.execute(name);
    await this.createDish.execute(dish);

    dish.scores.push(scoreCompatibility);
    return dish;
  }
}
