import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DishRepository } from '../../../domain/ports/dish.repository';
import { Dish } from '../../../domain/entities';
import { DishModel } from './models';

@Injectable()
export class MongoDishRepository implements DishRepository {
  constructor(
    @Inject('DISH_MODEL') private readonly dishModel: Model<DishModel>,
  ) {}

  async create(dish: Dish): Promise<void> {
    const dishCreated = new this.dishModel(dish);
    await dishCreated.save();
  }

  async findBy(name: string): Promise<Dish> {
    const foundDish = await this.dishModel.findOne({ name }).exec();
    return foundDish ? foundDish.toObject() : undefined;
  }
}
