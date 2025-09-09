import { Router } from "express";
import { HealthController } from "../controllers/healthController";

const router = Router();

// Health check routes
router.get("/health", HealthController.getHealth);
router.get("/db-health", HealthController.getDatabaseHealth);

export default router;
