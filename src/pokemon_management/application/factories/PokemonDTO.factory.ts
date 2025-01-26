import Pokemon from "../../domain/entities/Pokemon";
import { PokemonStats } from "../../domain/value_objects/PokemonStats";
import { PokemonDTO } from "../dto";

export interface IPokemonDTOFactory {
  createDTOFromEntity(pokemon: Pokemon): PokemonDTO;
}
export default class PokemonDTOFactory implements IPokemonDTOFactory {
  constructor() {
    this.createDTOFromEntity = this.createDTOFromEntity.bind(this);
    this.createStatsDTO = this.createStatsDTO.bind(this);
  }
  createDTOFromEntity(pokemon: Pokemon): PokemonDTO {
    return {
      id: pokemon.getId()!,
      type: pokemon.getType(),
      name: pokemon.getName(),
      stats: this.createStatsDTO(pokemon.getStats()),
    };
  }

  createStatsDTO(pokemonStats: PokemonStats): PokemonDTO["stats"] {
    return {
      hp: pokemonStats.hp,
      attack: pokemonStats.atk,
      defense: pokemonStats.def,
      specialAtk: pokemonStats.specialAtk,
    };
  }
}
