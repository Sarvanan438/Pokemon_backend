import PokedexRepository from "../../../infrastructure/repositories/impl/pokedex.repository";
import IPokemonRepository from "../../../infrastructure/repositories/pokemon.repository";
import PokemonRepositoryRegistry from "../../../infrastructure/repositories/PokemonRepositoryRegistry";
import Pokemon from "../../entities/Pokemon";
import IPokemonService from "../Pokemon.service";

class PokemonService implements IPokemonService {
  private static instance: PokemonService;

  private constructor(private pokemonRepository: IPokemonRepository) {}

  public static getInstance(
    pokemonRepository: IPokemonRepository
  ): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService(pokemonRepository);
    }
    return PokemonService.instance;
  }
  getPokemonsBy = async () => {
    return await this.pokemonRepository.getPokemons();
  };
}

export default PokemonService.getInstance(
  PokemonRepositoryRegistry.getRepository("POKEMON")
);
