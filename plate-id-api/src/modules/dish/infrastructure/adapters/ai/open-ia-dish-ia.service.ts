import { Injectable } from '@nestjs/common';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Dish } from '../../../domain/entities';
import { DishAIService } from '../../../domain/ports/dish-ai.service';
import { DishSchema, RecognizeDishSchema } from './dish-ai.schemas';
import { DishAIMapper } from './dish-ai.mapper';

@Injectable()
export class OpeniaDishAIService implements DishAIService {
  constructor(private readonly mapper: DishAIMapper) {}

  async recognizeDish(image: Buffer): Promise<string> {
    const prompt = `
      Basado en la imagen proporcionada, determina el nombre del platillo considerando las siguientes reglas:
      - Si la imagen no representa un platillo, devuelve "UNRECOGNIZED" como nombre.
      - Si la imagen contiene varios platillos, devuelve "MANY_DISHES" como nombre.
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: RecognizeDishSchema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            { type: 'image', image: image },
          ],
        },
      ],
    });

    return object.name;
  }

  async findDishDetails(dishName: string): Promise<Dish> {
    const prompt = `
      Dame el origen y la receta para el platillo ${dishName} dividida en ingredientes y pasos. Además, dame los siguientes scores:
        - Score Saludable: ¿Qué tan saludable es (1-100)? con una descripción del porque, no mas de 50 palabras
        - Score Delicioso: ¿Qué tan delicioso es según la percepción (1-100)? con una descripción del porque, no mas de 50 palabras
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: DishSchema,
      prompt: prompt,
    });

    return this.mapper.toDish(dishName, object);
  }
}
