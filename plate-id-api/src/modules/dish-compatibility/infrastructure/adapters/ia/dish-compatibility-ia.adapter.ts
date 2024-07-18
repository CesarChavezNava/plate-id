import { Injectable } from '@nestjs/common';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { DishCompatibilityIAPort } from '../../../domain/ports/dish-compatibility-ia.port';
import { Preferences, Score } from '../../../../shared/domain/entities';
import { ScoreSchema } from '../../../../shared/infrastructure/ia/ia.schemas';
import { IAMapper } from '../../../../shared/infrastructure/ia/ia.mapper';

@Injectable()
export class DishCompatibilityIAAdapter implements DishCompatibilityIAPort {
  constructor(private readonly mapper: IAMapper) {}

  async calcCompatibility(
    dishName: string,
    preferences: Preferences,
  ): Promise<Score> {
    let prompt = `
        Tengo las siguientes preferencias culinarias:
    `;
    if (
      preferences.favoriteIngredients &&
      preferences.favoriteIngredients.length > 0
    ) {
      prompt += `1. Ingredientes Favoritos: ${preferences.favoriteIngredients.join(
        ',',
      )}`;
    }

    if (
      preferences.dislikedIngredients &&
      preferences.dislikedIngredients.length > 0
    ) {
      prompt += `Ingredientes que no me agradan: ${preferences.dislikedIngredients.join(
        ',',
      )}`;
    }

    if (
      preferences.dietaryRestrictions &&
      preferences.dietaryRestrictions.length > 0
    ) {
      prompt += `3. Tengo las siguientes restricciones dieteticas: ${preferences.dietaryRestrictions.join(
        ',',
      )}`;
    }

    prompt += `
    Como experto culinario y nutriologo con base a lo anterior, dame el siguiente score:
    - Score Compatibilidad: ¿Qué tan compatible es el platillo ${dishName} (1-100), con base a mis preferencias anteriores? con una descripción del porque, no mas de 50 palabras
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: ScoreSchema,
      prompt: prompt,
    });

    return this.mapper.toScore(object);
  }
}
