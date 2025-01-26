import { Router } from "express";
import pokemonRouter from "./pokemon";
import pokemonRoutes from "../constants/routes";

const pokemonDomainRouter = Router();
pokemonDomainRouter.use(pokemonRoutes.POKEMONS, pokemonRouter);
export default pokemonDomainRouter;
