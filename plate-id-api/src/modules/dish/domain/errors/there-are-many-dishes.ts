import { BaseError } from '../../../shared/domain/entities';

export class ThereAreManyDishes extends BaseError {
  constructor() {
    super(`The image should only have one dish.`, 400);
  }
}
