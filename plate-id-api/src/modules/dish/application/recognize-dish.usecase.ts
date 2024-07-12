import { Inject, Injectable } from '@nestjs/common';
import { DishIAPort } from '../domain/ports/dish-ia.port';

@Injectable()
export class RecognizeDish {
  constructor(@Inject('DishIAPort') private readonly dishIAPort: DishIAPort) {}

  async execute(image: Buffer): Promise<string> {
    return await this.dishIAPort.recognizeDish(image);
  }
}
