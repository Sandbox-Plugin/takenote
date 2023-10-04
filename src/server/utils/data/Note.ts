export class Note {
  constructor(
    public readonly id: number,
    public readonly userToken: string,
    public readonly content: string,
    public readonly category: string,
    public readonly scratchpad: boolean,
    public readonly favorite: boolean,
    public readonly created: string,
    public readonly lastUpdated: string
  ) {}
}
