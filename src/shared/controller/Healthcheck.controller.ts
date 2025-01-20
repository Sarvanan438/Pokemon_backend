import { Request, Response } from 'express';
import os from 'os';

class HealthcheckController {
    private static instance: HealthcheckController;

    private constructor() {}

    public static getInstance(): HealthcheckController {
        if (!HealthcheckController.instance) {
            HealthcheckController.instance = new HealthcheckController();
        }
        return HealthcheckController.instance;
    }

    public ping(req: Request, res: Response): void {
        res.status(200).send({ message: 'pong' });
    }

    public status(req: Request, res: Response): void {
        const uptime = process.uptime();
        const cpuUsage = process.cpuUsage();
        const memoryUsage = process.memoryUsage();
        const loadAverage = os.loadavg();

        res.status(200).json({
            uptime,
            cpuUsage,
            memoryUsage,
            loadAverage,
        });
    }
}

export default HealthcheckController.getInstance();