import { Score } from '../../../shared/domain/entities';
import { UserPreferences } from '../entities';

export interface UserPreferencesIAPort {
  calculateCompatibility(
    dishName: string,
    user: UserPreferences,
  ): Promise<Score>;
}
