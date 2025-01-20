import "./shared/utility/EnvironmentOptions";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import "reflect-metadata";
import initializeDataSource from "./shared/datasource/datasource";
import UserRepository from "./user_management/infrastructure/repositories/UserRepository";
import User from "./user_management/domain/entities/User";
import errorHandler from "./shared/utility/ErrorHandler/ErrorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use(routes);
app.use(errorHandler as any);
initializeDataSource()
  .then(async () => {
    console.log("Database connected");
    app.listen(PORT, async () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`registered routes are`);

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
      console.log(routes);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });
