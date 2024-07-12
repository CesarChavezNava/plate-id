export class Score {
  constructor(
    public readonly name: string,
    public readonly value: number,
    private readonly description: string,
  ) {}
}
