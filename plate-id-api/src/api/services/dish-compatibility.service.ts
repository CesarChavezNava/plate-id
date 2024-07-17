import { Injectable } from '@nestjs/common';
import {
  CreateDish,
  FindDish,
  GetDishDetails,
  RecognizeDish,
} from '../../modules/dish/application';
import { Dish } from '../../modules/dish/domain/entities';

@Injectable()
export class DishCompatibilityService {
  constructor(
    private readonly recognizeDish: RecognizeDish,
    private readonly findDish: FindDish,
    private readonly createDish: CreateDish,
    private readonly getDishDetails: GetDishDetails,
  ) {}

  async search(image: Buffer): Promise<Dish> {
    const name = await this.recognizeDish.execute(image);
    let dish = await this.findDish.execute(name);

    if (dish) {
      return dish;
    }

    dish = await this.getDishDetails.execute(name);
    await this.createDish.execute(dish);

    return dish;
  }
}
