import { Router } from "express";
import apiRouter from './api';
import healthRouter from './healtcheck';
const router =  Router();

router.use(healthRouter)
router.use('/api/v1', apiRouter);
export default router;