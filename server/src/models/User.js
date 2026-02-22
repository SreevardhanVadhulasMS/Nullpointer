/**
 * ============================================================
 * USER MODEL (MONGOOSE SCHEMA)
 * ============================================================
 * Responsibility:
 * Defines the structure of the User document in MongoDB.
 *
 * What this model handles:
 * - Stores authentication data (local & Google users)
 * - Stores basic profile information
 * - Tracks user activity (last login)
 * - Supports role-based access control
 *
 * Why this design:
 * - Single schema for multiple auth providers
 * - Password is optional → required only for local users
 * - Email is unique → prevents duplicate accounts
 * - authProvider tells how the user signed up
 *
 * Used by:
 * - Signup controller
 * - Login controller
 * - Google OAuth controller
 * - Future protected routes & RBAC
 * ============================================================
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /**
     * User's display name
     * Trim removes unwanted spaces
     */
    name: {
      type: String,
      trim: true,
    },

    /**
     * Email → Primary identifier for authentication
     * - Required for all users
     * - Unique prevents duplicate accounts
     * - Lowercase ensures consistency while querying
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    /**
     * Password (hashed)
     * - Present only for LOCAL users
     * - null for Google users
     * Never stored in plain text
     */
    password: {
      type: String,
    },

    /**
     * Profile image
     * - Comes from Google OAuth or future uploads
     */
    avatar: String,

    /**
     * Authentication provider
     * Helps us:
     * - Block password login for Google users
     * - Know how the account was created
     * - Support multi-provider login in future
     */
    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },

    /**
     * Role for authorization (RBAC)
     * Can be used for:
     * - Admin dashboards
     * - Feature access control
     */
    role: {
      type: String,
      default: "user",
    },

    /**
     * Stores last successful login time
     * Useful for:
     * - Security monitoring
     * - Analytics
     * - Showing "Last active"
     */
    lastLoginAt: Date,
  },
  {
    /**
     * Automatically adds:
     * - createdAt
     * - updatedAt
     */
    timestamps: true,
  }
);

/**
 * Exporting the model so it can be used in controllers
 */
export default mongoose.model("User", userSchema);
