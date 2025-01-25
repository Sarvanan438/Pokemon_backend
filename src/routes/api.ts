import { Router } from "express";
import userManagementRouter from "../user_management/api/routes";
const router = Router();

router.use(userManagementRouter);

export default router;
