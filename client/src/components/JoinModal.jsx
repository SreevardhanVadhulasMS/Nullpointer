/**
 * ============================================================
 * JOIN MODAL (AUTHENTICATION UI COMPONENT)
 * ============================================================
 * Responsibility:
 * Provides the user interface for:
 * - Sign in (local authentication)
 * - Sign up (local authentication)
 * - Google OAuth login
 *
 * This component:
 * 1. Collects user credentials
 * 2. Sends authentication requests to backend
 * 3. Stores auth session using AuthContext
 * 4. Redirects authenticated users to dashboard
 *
 * Why this exists:
 * - Acts as the bridge between UI and backend auth system
 * - Keeps authentication logic separate from pages
 * - Reusable modal for login/signup anywhere in the app
 *
 * Backend endpoints used:
 * POST /api/auth/login
 * POST /api/auth/signup
 * POST /api/auth/google-login
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import "./JoinModal.css";

export default function JoinModal({ open, onClose }) {
  /**
   * UI STATE MANAGEMENT
   * mode → toggles between signin & signup view
   */
  const [mode, setMode] = useState("signin");

  /**
   * FORM INPUT STATE
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Navigation after successful authentication
   */
  const navigate = useNavigate();

  /**
   * AuthContext login()
   * Stores JWT + user globally
   */
  const { login } = useAuth();

  /**
   * If modal is not open → render nothing
   */
  if (!open) return null;

  // ============================================================
  // LOCAL SIGN IN
  // ============================================================
  const handleSignin = async () => {
    try {
      /**
       * Send credentials to backend for verification
       */
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      /**
       * Store session globally
       */
      login(res.data.token, res.data.user);

      /**
       * Close modal & redirect to protected page
       */
      onClose();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ============================================================
  // LOCAL SIGN UP
  // ============================================================
  const handleSignup = async () => {
    try {
      /**
       * Create new user account
       * Name is derived from email prefix for quick onboarding
       */
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: email.split("@")[0],
          email,
          password,
        }
      );

      /**
       * Auto-login after successful signup
       */
      login(res.data.token, res.data.user);

      onClose();
      navigate("/dashboard");
    } catch (err) {
      /**
       * If user already exists → attempt login instead
       * This improves UX by avoiding manual switch
       */
      if (err.response?.data?.message === "User already exists") {
        try {
          const loginRes = await axios.post(
            "http://localhost:5000/api/auth/login",
            { email, password }
          );

          login(loginRes.data.token, loginRes.data.user);
          onClose();
          navigate("/dashboard");
        } catch (loginErr) {
          alert(loginErr.response?.data?.message || "Login failed");
        }
      } else {
        alert(err.response?.data?.message || "Signup failed");
      }
    }
  };

  // ============================================================
  // GOOGLE OAUTH LOGIN
  // ============================================================
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      /**
       * Send Google ID token to backend
       * Backend will:
       * - Verify token with Google
       * - Find or create user
       * - Return JWT
       */
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          token: credentialResponse.credential,
        }
      );

      /**
       * Store session & redirect
       */
      login(res.data.token, res.data.user);
      onClose();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  // ============================================================
  // UI RENDER
  // ============================================================
  return (
    <div className="x-overlay" onClick={onClose}>
      <div className="x-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close modal */}
        <button className="x-close" onClick={onClose}>✕</button>

        {/* Dynamic title based on mode */}
        <h1 className="x-title">
          {mode === "signin" ? (
            <>Sign in to NullPointer<span className="np-dot">.</span></>
          ) : (
            <>Join NullPointer<span className="np-dot">.</span></>
          )}
        </h1>

        {/* Google OAuth button */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google login failed")}
        />

        <div className="x-divider">
          <span>or</span>
        </div>

        {/* Email input */}
        <input
          className="x-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          className="x-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Primary action button */}
        <button
          className="x-btn primary"
          onClick={mode === "signin" ? handleSignin : handleSignup}
        >
          {mode === "signin" ? "Next" : "Create account"}
        </button>

        {/* Optional future feature */}
        {mode === "signin" && (
          <button className="x-btn secondary">
            Forgot password?
          </button>
        )}

        {/* Mode switch */}
        <p className="x-footer">
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setMode("signup")}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("signin")}>Sign in</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
