import PokemonFetchFactory from "./infrastructure/factories/impl/PokemonFetch.factory";
import PokedexRepository from "./infrastructure/repositories/impl/pokedex.repository";
import PokemonRepositoryRegistry from "./infrastructure/repositories/PokemonRepositoryRegistry";

export default function registerPokemonRepositories() {
  PokemonRepositoryRegistry.registerRepository(
    "POKEMON",
    new PokedexRepository(new PokemonFetchFactory())
  );
}
