import Pokemon from "../../domain/entities/Pokemon";

export interface IPokemonEntityFactory<T> {
  convertEntityFromModel(item: T): Pokemon;
}
