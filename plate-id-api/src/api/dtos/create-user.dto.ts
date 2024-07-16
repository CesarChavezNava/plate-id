export class CreateUserDto {
  email: string;
  preferences: Preferences;
}

export class Preferences {
  favoriteIngredients?: string[];
  dislikedIngredients?: string[];
  dietaryRestrictions?: string[];
}
