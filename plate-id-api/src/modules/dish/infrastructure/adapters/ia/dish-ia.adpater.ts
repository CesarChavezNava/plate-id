import { generateObject } from 'ai';
import { Dish } from '../../../domain/entities';
import { openai } from '@ai-sdk/openai';
import { Injectable } from '@nestjs/common';
import { DishIAPort } from '../../../domain/ports/dish-ia.port';
import { DishSchema, RecognizeDishSchema } from './dish-ia.schemas';
import { DishIAMapper } from './dish-ia.mapper';

@Injectable()
export class DishIAAdapter implements DishIAPort {
  constructor(private readonly mapper: DishIAMapper) {}

  async recognizeDish(image: Buffer): Promise<string> {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: RecognizeDishSchema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Con base en la siguiente imagen dame el nombre del platillo',
            },
            { type: 'image', image: image },
          ],
        },
      ],
    });

    return object.name;
  }

  async getDetails(name: string): Promise<Dish> {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: DishSchema,
      prompt: `
  Dame el origen y la receta para el platillo ${name} dividida en ingredientes y pasos. Además, dame los siguientes scores:
  - Score Saludable: ¿Qué tan saludable es (1-100)? con una descripción del porque, no mas de 50 palabras
  - Score Delicioso: ¿Qué tan delicioso es según la percepción (1-100)? con una descripción del porque, no mas de 50 palabras`,
    });

    return this.mapper.toDish(name, object);
  }
}
