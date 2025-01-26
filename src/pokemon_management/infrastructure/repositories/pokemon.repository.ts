import Pokemon from "../../domain/entities/Pokemon";

export default interface IPokemonRepository {
  getPokemons(): Promise<Pokemon[]>;
}
