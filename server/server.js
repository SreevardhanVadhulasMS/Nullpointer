/**
 * ============================================================
 * SERVER ENTRY POINT
 * ============================================================
 * Responsibility:
 * Bootstraps the entire backend application.
 *
 * This file:
 * 1. Loads environment variables
 * 2. Connects to the database
 * 3. Starts the HTTP server
 *
 * Why this exists separately from app.js:
 * - Keeps the Express app testable
 * - Allows different startup strategies (tests, microservices)
 * - Clean separation between configuration and execution
 *
 * Application boot flow:
 * ENV → DB Connection → Express App → Start Server
 * ============================================================
 */

import dotenv from "dotenv";

/**
 * Loads variables from .env into process.env
 * Must be called BEFORE using process.env anywhere
 */
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

/**
 * Server port configuration
 * Uses environment variable in production
 */
const PORT = process.env.PORT || 5000;

/**
 * Establish MongoDB connection before starting the server
 * Ensures the app does not accept requests without DB access
 */
connectDB();

/**
 * Start the Express server
 * The app is now ready to handle incoming HTTP requests
 */
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
