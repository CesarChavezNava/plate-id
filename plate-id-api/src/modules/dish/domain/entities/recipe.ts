export class Recipe {
  constructor(
    public readonly ingredients: Ingredient[],
    public readonly instructions: Step[],
  ) {}
}

export class Ingredient {
  constructor(
    public readonly name: string,
    public readonly quantity?: string,
  ) {}
}

export class Step {
  constructor(
    public readonly index: number,
    public readonly description: string,
  ) {}
}
