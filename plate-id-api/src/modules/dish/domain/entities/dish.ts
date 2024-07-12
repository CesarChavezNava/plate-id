import { Recipe } from './recipe';
import { Score } from './score';

export class Dish {
  constructor(
    public readonly name: string,
    public readonly origin?: string,
    public readonly recipe?: Recipe,
    public readonly scores?: Score[],
  ) {}
}
