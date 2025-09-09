import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import routes from "./routes";
import {
  corsMiddleware,
  requestLogger,
  errorHandler,
  notFoundHandler,
} from "./middleware";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(corsMiddleware);
app.use(cors()); // Keep cors() as backup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use("/", routes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", notFoundHandler);

// Traditional server startup (works on Vercel with proper config)
const startServer = async () => {
  try {
    // Connect to MongoDB (non-blocking)
    connectDatabase().catch((err) => {
      console.error("MongoDB connection failed:", err);
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(
        `🗄️  DB health check: http://localhost:${PORT}/api/db-health`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Received SIGINT, shutting down gracefully...");
  const { disconnectDatabase } = await import("./config/database");
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Received SIGTERM, shutting down gracefully...");
  const { disconnectDatabase } = await import("./config/database");
  await disconnectDatabase();
  process.exit(0);
});

// Start server
startServer();

// Export for Vercel (if needed)
export default app;
