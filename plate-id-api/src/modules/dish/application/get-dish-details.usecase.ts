import { Inject, Injectable } from '@nestjs/common';
import { DishIAPort } from '../domain/ports/dish-ia.port';
import { Dish } from '../domain/entities';

@Injectable()
export class GetDishDetails {
  constructor(@Inject('DishIAPort') private readonly dishIAPort: DishIAPort) {}

  async execute(name: string): Promise<Dish> {
    return await this.dishIAPort.getDetails(name);
  }
}
