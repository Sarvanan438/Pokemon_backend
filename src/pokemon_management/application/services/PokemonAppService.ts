import { PokemonDTO } from "../dto/PokemonDTO";

export default interface IPokemonAppService {
  getPokemons(): Promise<Array<PokemonDTO>>;
}
