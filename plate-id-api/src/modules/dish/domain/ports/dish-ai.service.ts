import { Dish } from '../entities';

export interface DishAIService {
  recognizeDish(dishImage: Buffer): Promise<string>;
  findDishDetails(dishName: string): Promise<Dish>;
}
