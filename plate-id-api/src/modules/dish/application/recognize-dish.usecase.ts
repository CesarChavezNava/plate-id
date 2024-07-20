import { Inject, Injectable } from '@nestjs/common';
import { DishAIService } from '../domain/ports/dish-ai.service';
import { DishUnrecognized, ThereAreManyDishes } from '../domain/errors';

export interface ForRecognizingDish {
  execute(dishImage: Buffer): Promise<string>;
}

@Injectable()
export class DishRecognizer implements ForRecognizingDish {
  constructor(
    @Inject('DishAIService') private readonly dishAIService: DishAIService,
  ) {}

  async execute(dishImage: Buffer): Promise<string> {
    const dishName = await this.dishAIService.recognizeDish(dishImage);

    if (dishName === 'UNRECOGNIZED') {
      throw new DishUnrecognized();
    }

    if (dishName === 'MANY_DISHES') {
      throw new ThereAreManyDishes();
    }

    return dishName;
  }
}
