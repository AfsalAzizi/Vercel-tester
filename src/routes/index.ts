import { Router } from "express";
import { HealthController } from "../controllers/healthController";
import healthRoutes from "./healthRoutes";

const router = Router();

// Root route
router.get("/", HealthController.getRoot);

// API routes
router.use("/api", healthRoutes);

export default router;
