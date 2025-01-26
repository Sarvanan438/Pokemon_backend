import { RepositoryNotFound } from "../../domain/errors";
import { RepositoriesType } from "../types";

export default class RepositoryRegistry {
  static repositoryMap: Map<RepositoriesType, any> = new Map();

  static getRepository<T>(key: RepositoriesType): T {
    if (!RepositoryRegistry.repositoryMap.has(key))
      throw new RepositoryNotFound();
    return RepositoryRegistry.repositoryMap.get(key);
  }

  static registerRepository(key: RepositoriesType, repository: any) {
    RepositoryRegistry.repositoryMap.set(key, repository);
  }
}
