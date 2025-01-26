import Pokemon from "../../../domain/entities/Pokemon";
import { PokemonStats } from "../../../domain/value_objects/PokemonStats";
import PokemonResponse from "../../models/pokemon.model";
import { IPokemonEntityFactory } from "../PokemonEntityFactory";

export default class PokemonFetchFactory
  implements IPokemonEntityFactory<PokemonResponse>
{
  convertEntityFromModel(item: PokemonResponse): Pokemon {
    const pokemon = new Pokemon(
      item.name,
      "grass",
      this.convertToEntityStats(item)
    );
    pokemon.setId(String(item.id));
    return pokemon;
  }

  convertToEntityStats(item: PokemonResponse): PokemonStats {
    return {
      hp: item.height,
      def: item.weight,
      atk: item.base_experience,
      specialAtk: item.height * item.weight,
    };
  }
}
