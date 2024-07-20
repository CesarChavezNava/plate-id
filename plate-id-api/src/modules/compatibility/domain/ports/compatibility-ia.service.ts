import { Preferences, Score } from '../../../shared/domain/entities';

export interface CompatibilityAIService {
  calculate(dishName: string, preferences: Preferences): Promise<Score>;
}
