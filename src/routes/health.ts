import { Router, Request, Response } from "express";
import { getDatabaseStatus } from "../config/database";

const router = Router();

// Health check endpoint
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Database connection test endpoint
router.get("/db-health", async (req: Request, res: Response) => {
  try {
    const dbStatus = getDatabaseStatus();
    const isConnected = dbStatus === "connected";

    if (isConnected) {
      res.status(200).json({
        status: "OK",
        database: {
          status: dbStatus,
          connected: true,
          message: "Database connection is working perfectly",
        },
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(503).json({
        status: "ERROR",
        database: {
          status: dbStatus,
          connected: false,
          message: "Database connection is not available",
        },
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: {
        status: "error",
        connected: false,
        message: "Failed to check database connection",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
