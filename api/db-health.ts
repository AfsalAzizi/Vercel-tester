import { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/quickbarber";

    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      res.status(200).json({
        status: "OK",
        database: {
          status: "connected",
          connected: true,
          message: "Database connection is working perfectly",
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Try to connect
    await mongoose.connect(MONGODB_URI);

    const dbStatus = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    const statusText = states[dbStatus as keyof typeof states] || "unknown";
    const isConnected = dbStatus === 1;

    if (isConnected) {
      res.status(200).json({
        status: "OK",
        database: {
          status: statusText,
          connected: true,
          message: "Database connection is working perfectly",
        },
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(503).json({
        status: "ERROR",
        database: {
          status: statusText,
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
