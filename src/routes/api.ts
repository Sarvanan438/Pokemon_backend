import { Router } from "express";
import userManagementRouter from "../user_management/api/routes";
import pokemonDomainRouter from "../pokemon_management/api/routes";
const router = Router();

router.use(userManagementRouter);
router.use(pokemonDomainRouter);
export default router;
