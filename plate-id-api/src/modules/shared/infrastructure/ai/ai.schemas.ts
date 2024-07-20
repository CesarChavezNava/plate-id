import { z } from 'zod';

export const ScoreSchema = z.object({
  name: z.string().describe('Nombre del score'),
  value: z.number().min(1).max(100).describe('Valor entre 1 y 100'),
  description: z.string().describe('Descripcion del porque el score'),
});

export type ScoreType = z.infer<typeof ScoreSchema>;
