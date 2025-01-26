import { Router } from "express";
import pokemonRoutes from "../constants/routes";
import authMiddleware from "../../../shared/utility/AuthMiddleware/AuthMiddleware";
import BearerTokenExtractor from "../../../shared/utility/TokenExtractor/impl/BearerTokenExtractor";
import JWTVerifier from "../../../shared/utility/TokenVerifier/impl/JWTVerifier";
import { PokemonController } from "../controllers";
const pokemonRouter = Router();
pokemonRouter.use(
  authMiddleware(new BearerTokenExtractor(), new JWTVerifier())
);
pokemonRouter.get("/", PokemonController.getPokemons);
export default pokemonRouter;
