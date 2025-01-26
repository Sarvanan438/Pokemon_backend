import { PokemonType } from "../../domain/type";

export interface PokemonDTO {
  id: string;
  type: PokemonType;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAtk: number;
  };
  name: string;
}
