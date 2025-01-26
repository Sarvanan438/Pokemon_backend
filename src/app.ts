import "./shared/utility/EnvironmentOptions";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import "reflect-metadata";

import errorHandler from "./shared/utility/ErrorHandler/ErrorHandler";
import registerUsermanagementRepositories from "./user_management/infrastructure/registerRepositories";
import { DataSource } from "typeorm";
import registerPokemonRepositories from "./pokemon_management/registerPokemonRepositories";
const app = express();
const PORT = process.env.PORT || 3000;
const registerRepositories = (dataSource: DataSource) => {
  registerUsermanagementRepositories(dataSource);
  registerPokemonRepositories();
};
// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

const setupApp = async (dataSource: DataSource) => {
  if (dataSource) registerRepositories(dataSource);
  console.log("Database connected");
  const routes = await import("./routes");
  app.use(routes.default);
  app.use(errorHandler as any);
  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    const routes: any[] = [];
    app._router.stack.forEach(function (middleware: any) {
      if (middleware.route) {
        // routes registered directly on the app
        routes.push(middleware.route);
      } else if (middleware.name === "router") {
        // router middleware
        middleware.handle.stack.forEach(function (handler: any) {
          const route = handler.route;
          route && routes.push(route);
        });
      }
    });
  });
};

export default setupApp;
