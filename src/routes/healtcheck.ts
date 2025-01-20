import { Router } from 'express';
import HealthcheckController from '../shared/controller/Healthcheck.controller';
const router = Router();

router.get('/ping', HealthcheckController.ping);

router.get('/status', HealthcheckController.status);

export default router;