import { z } from 'zod';

export const ScoreSchema = z.object({
  name: z.string().describe('Nombre del score'),
  value: z.number().min(1).max(100).describe('Valor entre 1 y 100'),
  description: z.string().describe('Descripcion del porque el score'),
});

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
