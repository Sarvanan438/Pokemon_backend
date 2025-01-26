import RepositoryNotFound from "../../../shared/errors/repository/RepositoryNotFound";
import { PokemonRepositoryType as RepositoriesType } from "../../domain/type";

export default class PokemonRepositoryRegistry {
  static repositoryMap: Map<RepositoriesType, any> = new Map();

  static getRepository<T>(key: RepositoriesType): T {
    if (!PokemonRepositoryRegistry.repositoryMap.has(key))
      throw new RepositoryNotFound();
    return PokemonRepositoryRegistry.repositoryMap.get(key);
  }

  static registerRepository(key: RepositoriesType, repository: any) {
    PokemonRepositoryRegistry.repositoryMap.set(key, repository);
  }
}
