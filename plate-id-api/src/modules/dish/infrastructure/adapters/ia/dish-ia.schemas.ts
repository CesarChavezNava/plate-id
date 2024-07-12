import { z } from 'zod';

export const ScoreSchema = z.object({
  name: z.string().describe('Nombre del score'),
  value: z.number().min(1).max(100).describe('Valor entre 1 y 100'),
  description: z.string().describe('Descripcion del porque el score'),
});

export const StepSchema = z.object({
  index: z.number().positive().describe('Número de paso'),
  description: z.string().describe('Descripción de lo que se tiene que hacer'),
});

export const IngredientSchema = z.object({
  name: z.string().describe('Nombre o descripción del ingrediente'),
  quantity: z.string().describe('Cantidad del ingrediente'),
});

export const RecipeSchema = z.object({
  ingredients: z.array(IngredientSchema).describe('Lista de ingredientes'),
  instructions: z.array(StepSchema).describe('Instrucciones en pasos'),
});

export const DishSchema = z.object({
  origin: z.string().describe('País de origen del platillo'),
  recipe: RecipeSchema.describe('Receta'),
  scores: z.array(ScoreSchema).describe('Diferentes scores sobre el platillo'),
});

export type DishType = z.infer<typeof DishSchema>;

export const RecognizeDishSchema = z.object({
  name: z.string(),
});
