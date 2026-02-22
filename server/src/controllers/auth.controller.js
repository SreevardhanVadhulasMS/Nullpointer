/**
 * ============================================================
 * AUTHENTICATION CONTROLLER
 * ============================================================
 * Responsibility:
 * Handles all authentication-related operations:
 *
 * 1. Local Signup  → Create account with email & password
 * 2. Local Login   → Authenticate using stored credentials
 * 3. Google Login  → Authenticate using Google OAuth
 * 4. JWT Issuing   → Generate secure session tokens
 *
 * Why this exists:
 * - Keeps route files clean (routes → controller → business logic)
 * - Central place for auth workflows
 * - Makes the system scalable for adding more providers (GitHub, etc.)
 *AC
 * Security:
 * - Passwords are hashed using bcrypt
 * - JWT is signed using a secret from environment variables
 * - Google ID tokens are verified with Google before login
 * ============================================================
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

/**
 * Google OAuth client
 * Used to verify the ID token received from frontend
 */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Helper: Generates JWT for authenticated users
 * This token is sent to frontend and used for protected routes
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // user stays logged in for 7 days
  });
};

// ============================================================
// LOCAL SIGNUP
// ============================================================
// Creates a new user using name, email and password
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving (never store plain text passwords)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local", // indicates this is a normal signup
    });

    // Send JWT + user data to frontend
    res.status(201).json({
      token: signToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

// ============================================================
// LOCAL LOGIN
// ============================================================
// Authenticates existing users using email & password
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist OR it's a Google-only account → block login
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login timestamp (useful for analytics / security)
    user.lastLoginAt = new Date();
    await user.save();

    // Send JWT + user
    res.json({
      token: signToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// ============================================================
// GOOGLE LOGIN
// ============================================================
// Authenticates users using Google OAuth
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    /**
     * Verify the Google ID token:
     * - Confirms it was issued by Google
     * - Confirms it was issued for YOUR app
     */
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract user info from Google payload
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user already exists in our DB
    let user = await User.findOne({ email });

    // If new user → create account automatically
    if (!user) {
      user = await User.create({
        name,
        email,
        password: null, // No password for Google users
        authProvider: "google",
        avatar: picture,
      });
    }

    // Update last login timestamp
    user.lastLoginAt = new Date();
    await user.save();

    // Issue our own JWT for session handling
    res.json({
      token: signToken(user._id),
      user,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
};
