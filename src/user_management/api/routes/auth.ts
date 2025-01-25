import { Router } from "express";
import routes from "../constants/routes";
import AuthControllers from "../controllers/AuthControllers";
const router = Router();

router.post(routes.LOGIN, AuthControllers.login);
router.post(routes.REGISTER, AuthControllers.register);
router.post(routes.LOGOUT, AuthControllers.logout);
router.get(routes.GET_USERS, AuthControllers.getUsers);
export default router;
