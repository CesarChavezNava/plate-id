import { BaseError } from '../../../shared/domain/entities';

export class DishUnrecognized extends BaseError {
  constructor() {
    super(`Who are you trying to fool? That's not a dish.`, 400);
  }
}
