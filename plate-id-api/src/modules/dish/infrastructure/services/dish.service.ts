import { Injectable } from '@nestjs/common';
import { Dish } from '../../domain/entities';
import {
  GetDishDetails,
  FindDish,
  RecognizeDish,
  CreateDish,
} from '../../applicatiion';

@Injectable()
export class DishService {
  constructor(
    private readonly recognizeDish: RecognizeDish,
    private readonly findDish: FindDish,
    private readonly createDish: CreateDish,
    private readonly getDishDetails: GetDishDetails,
  ) {}

  async findOrCreate(image: Buffer): Promise<Dish> {
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
