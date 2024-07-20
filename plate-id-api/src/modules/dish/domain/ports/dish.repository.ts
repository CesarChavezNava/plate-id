import { Dish } from '../entities';

export interface DishRepository {
  create(dish: Dish): Promise<void>;
  findBy(name: string): Promise<Dish>;
}
