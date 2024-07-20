import { z } from 'zod';
import { ScoreSchema } from '../../../../shared/infrastructure/ai/ai.schemas';

export const RecipeSchema = z.object({
  ingredients: z
    .array(z.string().describe('Amount - ingredient name'))
    .describe('List of ingredients'),
  instructions: z
    .array(z.string().describe('# - Instruction detail'))
    .describe('Steps'),
});

export const DishSchema = z.object({
  origin: z.string().describe('Origin country'),
  recipe: RecipeSchema.describe('Recipe'),
  scores: z.array(ScoreSchema).describe('Diferent scores about dish'),
});

export type DishType = z.infer<typeof DishSchema>;

export const RecognizeDishSchema = z.object({
  name: z.string(),
  score: ScoreSchema.optional().describe(
    'score how compatible the dish is according to your tastes',
  ),
});
