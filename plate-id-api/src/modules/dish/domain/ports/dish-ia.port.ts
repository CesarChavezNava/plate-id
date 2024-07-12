import { Dish } from '../entities';

export interface DishIAPort {
  recognizeDish(image: Buffer): Promise<string>;
  getDetails(name: string): Promise<Dish>;
}
