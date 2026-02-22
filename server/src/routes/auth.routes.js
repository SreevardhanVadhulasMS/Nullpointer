/**
 * ============================================================
 * AUTH ROUTES
 * ============================================================
 * Responsibility:
 * Defines all HTTP endpoints related to authentication.
 *
 * This file ONLY maps:
 *   URL  →  Controller function
 *
 * It does NOT contain business logic.
 * That lives inside the controller.
 *
 * Why this separation:
 * - Keeps routing clean and readable
 * - Makes controllers reusable
 * - Scales well when adding more auth providers
 *
 * Base route (from app.js):
 *   /api/auth
 *
 * So the final endpoints become:
 *   POST /api/auth/signup
 *   POST /api/auth/login
 *   POST /api/auth/google-login
 * ============================================================
 */

import express from "express";

/**
 * Controller functions handling actual authentication logic
 */
import {
  signup,
  login,
  googleLogin,
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * ============================================================
 * LOCAL AUTH ROUTES
 * ============================================================
 */

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user with email & password
 * @access  Public
 */
router.post("/signup", signup);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate existing user with email & password
 * @access  Public
 */
router.post("/login", login);

/**
 * ============================================================
 * GOOGLE OAUTH ROUTE
 * ============================================================
 */

/**
 * @route   POST /api/auth/google-login
 * @desc    Authenticate user using Google OAuth token
 * @access  Public
 *
 * Flow:
 * Frontend → sends Google credential → controller verifies
 * → user is created (if new) → JWT returned
 */
router.post("/google-login", googleLogin);

/**
 * Exporting router so it can be mounted in app.js
 */
export default router;
