import { Preferences, Score } from '../../../shared/domain/entities';

export interface DishCompatibilityIAPort {
  calcCompatibility(dishName: string, preferences: Preferences): Promise<Score>;
}
