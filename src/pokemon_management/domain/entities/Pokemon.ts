import { PokemonType } from "../type";
import { PokemonStats } from "../value_objects/PokemonStats";

export default class Pokemon {
  private id: string | null = null;

  constructor(
    private name: string,
    private type: PokemonType,
    private stats: PokemonStats
  ) {}
  public getId(): string | null {
    return this.id;
  }

  public setId(id: string | null): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getType(): PokemonType {
    return this.type;
  }

  public setType(type: PokemonType): void {
    this.type = type;
  }

  public getStats(): PokemonStats {
    return this.stats;
  }

  public setStats(stats: PokemonStats): void {
    this.stats = stats;
  }
}
