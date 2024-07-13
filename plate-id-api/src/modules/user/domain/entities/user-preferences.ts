export class UserPreferences {
  constructor(
    public readonly favoriteIngredients: string[],
    public readonly dislikedIngredients: string[],
    public readonly dietaryRestrictions: string[],
  ) {}
}
