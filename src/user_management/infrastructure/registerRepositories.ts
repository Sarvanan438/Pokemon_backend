import { DataSource } from "typeorm";
import { RepositoryRegistry, UserRepository } from "./repositories";

export default function registerRepositories(datasource: DataSource) {
  RepositoryRegistry.registerRepository("USER", new UserRepository(datasource));
}
