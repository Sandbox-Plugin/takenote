export class Note {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly noteCategoryId: number,
    public readonly scratchpad: boolean,
    public readonly favorite: boolean,
    public readonly created: string,
    public readonly lastUpdated: string
  ) {}
}
