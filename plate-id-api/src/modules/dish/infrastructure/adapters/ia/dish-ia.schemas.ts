import { z } from 'zod';
import { ScoreSchema } from '../../../../shared/infrastructure/ia/ia.schemas';

export const RecipeSchema = z.object({
  ingredients: z
    .array(z.string().describe('Amount - ingredient name'))
    .describe('Lista de ingredientes'),
  instructions: z
    .array(z.string().describe('# - Instruction detail'))
    .describe('Instrucciones en pasos'),
});

export const DishSchema = z.object({
  origin: z.string().describe('País de origen del platillo'),
  recipe: RecipeSchema.describe('Receta'),
  scores: z.array(ScoreSchema).describe('Diferentes scores sobre el platillo'),
});

export type DishType = z.infer<typeof DishSchema>;

export const RecognizeDishSchema = z.object({
  name: z.string(),
  score: ScoreSchema.optional().describe(
    'score how compatible the dish is according to your tastes',
  ),
});
