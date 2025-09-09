import { Request, Response, NextFunction } from "express";
import { connectDatabase } from "../config/database";

/**
 * Middleware to ensure database connection is established
 */
export const ensureDatabaseConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if database is already connected
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      // If not connected, try to connect
      await connectDatabase();
    }
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error);
    // Don't block the request, just log the error
    next();
  }
};

/**
 * Middleware to add database status to request object
 */
export const addDatabaseStatus = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const mongoose = require("mongoose");
    const dbStatus = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    req.dbStatus = states[dbStatus as keyof typeof states] || "unknown";
    req.isDbConnected = dbStatus === 1;
    next();
  } catch (error) {
    req.dbStatus = "error";
    req.isDbConnected = false;
    next();
  }
};
