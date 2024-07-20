import { Injectable } from '@nestjs/common';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { CompatibilityAIService } from '../../../domain/ports/compatibility-ia.service';
import { Preferences, Score } from '../../../../shared/domain/entities';
import { ScoreSchema } from '../../../../shared/infrastructure/ai/ai.schemas';
import { AIMapper } from '../../../../shared/infrastructure/ai/ai.mapper';

@Injectable()
export class OpeniaCompatibilityAIService implements CompatibilityAIService {
  constructor(private readonly mapper: AIMapper) {}

  async calculate(dishName: string, preferences: Preferences): Promise<Score> {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: ScoreSchema,
      prompt: this.buildPrompt(dishName, preferences),
    });

    return this.mapper.toScore(object);
  }

  private buildPrompt(dishName: string, preferences: Preferences) {
    let prompt = 'Tengo las siguientes preferencias culinarias: ';

    if (
      preferences.favoriteIngredients &&
      preferences.favoriteIngredients.length > 0
    ) {
      prompt += `1. Ingredientes favoritos: ${preferences.favoriteIngredients.join(
        ', ',
      )}.\n`;
    }

    if (
      preferences.dislikedIngredients &&
      preferences.dislikedIngredients.length > 0
    ) {
      prompt += `2. Ingredientes que no me agradan: ${preferences.dislikedIngredients.join(
        ', ',
      )}.\n`;
    }

    if (
      preferences.dietaryRestrictions &&
      preferences.dietaryRestrictions.length > 0
    ) {
      prompt += `3. Restricciones dietéticas: ${preferences.dietaryRestrictions.join(
        ', ',
      )}.\n`;
    }

    prompt += `
      Como experto culinario y nutriólogo, con base en la información anterior, evalúa el platillo "${dishName}" de la siguiente manera:
      - Score de compatibilidad: ¿Qué tan compatible es el platillo (1-100) con mis preferencias?
      - Explicación: Una breve descripción del por qué, no más de 50 palabras.
    `;

    return prompt;
  }
}
