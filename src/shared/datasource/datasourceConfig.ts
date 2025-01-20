import { DataSource } from "typeorm";
import User from "../../user_management/infrastructure/models/User.model";
import EnvironmentProperties from "../utility/EnvironmentOptions";

const AppDataSource = new DataSource({
  type: "mysql",
  host: EnvironmentProperties.getOrDefault("ADMIN_DB_HOST", "localhost"),
  port: parseInt(EnvironmentProperties.getOrDefault("ADMIN_DB_PORT", "3306")),
  username: EnvironmentProperties.getOrDefault("ADMIN_DB_USER", "root"),
  password: EnvironmentProperties.getOrDefault("ADMIN_DB_PASS", "root"),
  database: EnvironmentProperties.getOrDefault("ADMIN_DB_NAME", "admin"),
  logging: true,
  synchronize: true,
  entities: [User],
});

export default AppDataSource;
