import { UserPreferences } from 'src/modules/user/domain/entities';
import { UserPreferencesIAPort } from '../../../domain/port/user-preferences-ia.port';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ScoreSchema } from '../../../../shared/infrastructure/ia/ia.schemas';
import { Score } from '../../../../shared/domain/entities';
import { IAMapper } from '../../../../shared/infrastructure/ia/ia.mapper';

export class UserPreferencesIAAdapter implements UserPreferencesIAPort {
  constructor(private readonly mapper: IAMapper) {}

  async calculateCompatibility(
    dishName: string,
    user: UserPreferences,
  ): Promise<Score> {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: ScoreSchema,
      prompt: `
      De acuerdo con el platillo ${dishName} dame el score de compatibilidad (1-100) y explicame el porque ese score, con base en las siguientes reglas:
      - Ingredientes favoritos ${user.favoriteIngredients.join(',')}
      - Ingredientes que no me agradan ${user.dislikedIngredients.join(',')}
      - Restricciones de dieta: ${user.dietaryRestrictions.join(',')}`,
    });

    return this.mapper.toScore(object);
  }
}
