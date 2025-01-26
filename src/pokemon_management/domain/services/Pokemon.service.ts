import Pokemon from "../entities/Pokemon";

export default interface IPokemonService {
  getPokemonsBy(): Promise<Array<Pokemon>>;
}
