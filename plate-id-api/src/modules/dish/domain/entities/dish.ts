import { Score } from '../../../shared/domain/entities';
import { Recipe } from './recipe';

export class Dish {
  constructor(
    public readonly name: string,
    public readonly origin: string,
    public readonly recipe: Recipe,
    public readonly scores: Score[],
  ) {}
}
