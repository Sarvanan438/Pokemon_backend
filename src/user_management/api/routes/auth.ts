import { Router } from "express";
import routes from "../constants/routes";
import AuthControllers from "../controllers/AuthControllers";
import authMiddleware from "../../../shared/utility/AuthMiddleware/AuthMiddleware";
import BearerTokenExtractor from "../../../shared/utility/TokenExtractor/impl/BearerTokenExtractor";
import JWTVerifier from "../../../shared/utility/TokenVerifier/impl/JWTVerifier";
const router = Router();
const authenticatedRouter = Router();
router.post(routes.LOGIN, AuthControllers.login);
router.post(routes.REGISTER, AuthControllers.register);
router.post(routes.LOGOUT, AuthControllers.logout);

authenticatedRouter.use(
  authMiddleware(new BearerTokenExtractor(), new JWTVerifier())
);
authenticatedRouter.get(routes.GET_USERS, AuthControllers.getUsers);
router.use(authenticatedRouter);
export default router;
