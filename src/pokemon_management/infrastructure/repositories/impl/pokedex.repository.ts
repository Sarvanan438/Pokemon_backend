import InternalServerError from "../../../../shared/errors/InternalServerError";
import Pokemon from "../../../domain/entities/Pokemon";
import { IPokemonEntityFactory } from "../../factories/PokemonEntityFactory";
import PokemonResponse from "../../models/pokemon.model";
import IPokemonRepository from "../pokemon.repository";
import Pokedex from "pokedex-promise-v2";
export default class PokedexRepository implements IPokemonRepository {
  private pokedex: Pokedex;
  constructor(private entityFactory: IPokemonEntityFactory<Pokedex.Pokemon>) {
    this.pokedex = new Pokedex();
  }

  private static instance: PokedexRepository;

  public static getInstance(
    entityFactory: IPokemonEntityFactory<Pokedex.Pokemon>
  ): PokedexRepository {
    if (!PokedexRepository.instance) {
      PokedexRepository.instance = new PokedexRepository(entityFactory);
    }
    return PokedexRepository.instance;
  }

  getPokemon = async ({ name, url }: { name: string; url: string }) => {
    try {
      const pokemonResource = await this.pokedex.getPokemonByName(name);

      return this.entityFactory.convertEntityFromModel(pokemonResource);
    } catch (e) {
      console.error(e);
      throw new InternalServerError(
        "Failed to fetch pokemon resource for " + name
      );
    }
  };
  getPokemons = async () => {
    try {
      const { results: pokemons } = await this.pokedex.getPokemonsList({
        limit: 10,
      });
      const pokemonEntities = await Promise.all(pokemons.map(this.getPokemon));
      console.log("entires", pokemonEntities);
      return pokemonEntities;
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
  };
}
