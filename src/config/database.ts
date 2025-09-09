import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/quickbarber";

export const connectDatabase = async (): Promise<void> => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    console.log("🔄 Attempting to connect to MongoDB...");
    console.log("MongoDB URI:", MONGODB_URI.replace(/\/\/.*@/, "//***:***@")); // Hide credentials in logs

    await mongoose.connect(MONGODB_URI, {
      // Connection pool settings optimized for Vercel
      maxPoolSize: 1, // Single connection for Vercel
      serverSelectionTimeoutMS: 5000, // Quick timeout
      socketTimeoutMS: 30000, // 30 second socket timeout
      bufferCommands: false, // Disable mongoose buffering
      // Connection settings
      connectTimeoutMS: 10000, // 10 second connection timeout
      heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds
      // Retry settings
      retryWrites: true,
      retryReads: true,
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Don't exit process in production, just log the error
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error disconnecting from MongoDB:", error);
  }
};

export const getDatabaseStatus = (): string => {
  const state = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return states[state as keyof typeof states] || "unknown";
};
