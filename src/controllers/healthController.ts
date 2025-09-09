import { Request, Response } from "express";
import { getDatabaseStatus } from "../config/database";

export class HealthController {
  /**
   * Basic health check endpoint
   */
  static async getHealth(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
      });
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * Database health check endpoint
   */
  static async getDatabaseHealth(req: Request, res: Response): Promise<void> {
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
  }

  /**
   * Root endpoint with API information
   */
  static async getRoot(req: Request, res: Response): Promise<void> {
    res.json({
      message: "Welcome to Express MongoDB App",
      version: "1.0.0",
      endpoints: {
        health: "/api/health",
        dbHealth: "/api/db-health",
      },
      timestamp: new Date().toISOString(),
    });
  }
}
