/**
 * ============================================================
 * DATABASE CONNECTION MODULE
 * ============================================================
 * Responsibility:
 * Establishes a connection between the Node.js backend and MongoDB
 * using Mongoose.
 *
 * Why this exists:
 * - Keeps DB connection logic separate from server startup
 * - Allows reuse in tests, workers, or multiple entry points
 * - Ensures the app stops immediately if DB connection fails
 *
 * Behavior:
 * - Reads MongoDB URI from environment variables
 * - Connects asynchronously
 * - Logs success message on connection
 * - Terminates the process if connection fails
 * ============================================================
 */

import mongoose from "mongoose";

/**
 * Connects to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the connection string from .env
    await mongoose.connect(process.env.MONGO_URI);

    // Log success so we know DB is ready before handling requests
    console.log("MongoDB connected");
  } catch (error) {
    // Log detailed error for debugging
    console.error("MongoDB connection failed:", error.message);

    // Exit the process immediately — app should not run without DB
    process.exit(1);
  }
};

export default connectDB;
