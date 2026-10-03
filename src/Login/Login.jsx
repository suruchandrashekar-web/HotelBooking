
import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

// =====================================================
// HOTEL BOOKING - LOGIN PAGE
// =====================================================

function Login() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // LOAD REMEMBERED USER
  // =====================================================

  useEffect(() => {
    try {
      const savedEmail =
        localStorage.getItem(
          "hotelBookingRememberedEmail"
        );

      const savedRemember =
        localStorage.getItem(
          "hotelBookingRememberMe"
        );

      if (savedEmail) {
        setEmail(savedEmail);
      }

      if (savedRemember === "true") {
        setRememberMe(true);
      }
    } catch (error) {
      console.error(
        "Remembered login loading error:",
        error
      );
    }
  }, []);

  // =====================================================
  // GET USERS
  // =====================================================

  const getUsers = () => {
    try {
      const users = JSON.parse(
        localStorage.getItem(
          "hotelBookingUsers"
        ) || "[]"
      );

      return Array.isArray(users)
        ? users
        : [];
    } catch (error) {
      console.error(
        "Hotel users loading error:",
        error
      );

      return [];
    }
  };

  // =====================================================
  // GET SINGLE SAVED USER
  // =====================================================

  const getSavedUser = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem(
          "hotelBookingUser"
        ) || "null"
      );

      return user;
    } catch (error) {
      console.error(
        "Saved hotel user loading error:",
        error
      );

      return null;
    }
  };

  // =====================================================
  // SAVE LOGIN SESSION
  // =====================================================

  const saveLoginSession = (
    user,
    loginType = "normal"
  ) => {
    if (!user) {
      return;
    }

    // ---------------------------------------------------
    // LOGIN STATUS
    // ---------------------------------------------------

    localStorage.setItem(
      "hotelBookingLoggedIn",
      "true"
    );

    // ---------------------------------------------------
    // LOGGED-IN USER
    // ---------------------------------------------------

    localStorage.setItem(
      "hotelBookingCurrentUser",
      JSON.stringify(user)
    );

    // ---------------------------------------------------
    // USER EMAIL
    // ---------------------------------------------------

    localStorage.setItem(
      "hotelBookingUserEmail",
      user.email || ""
    );

    // ---------------------------------------------------
    // USER NAME
    // ---------------------------------------------------

    localStorage.setItem(
      "hotelBookingUserName",
      user.name ||
        user.fullName ||
        "Hotel Guest"
    );

    // ---------------------------------------------------
    // USER ID
    // ---------------------------------------------------

    if (user.id !== undefined && user.id !== null) {
      localStorage.setItem(
        "hotelBookingUserId",
        String(user.id)
      );
    }

    // ---------------------------------------------------
    // LOGIN TYPE
    // ---------------------------------------------------

    localStorage.setItem(
      "hotelBookingLoginType",
      loginType
    );

    // ---------------------------------------------------
    // REMEMBER ME
    // ---------------------------------------------------

    if (rememberMe) {
      localStorage.setItem(
        "hotelBookingRememberMe",
        "true"
      );

      localStorage.setItem(
        "hotelBookingRememberedEmail",
        user.email || ""
      );
    } else {
      localStorage.removeItem(
        "hotelBookingRememberMe"
      );

      localStorage.removeItem(
        "hotelBookingRememberedEmail"
      );
    }
  };

  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    // ---------------------------------------------------
    // CLEAN INPUT
    // ---------------------------------------------------

    const emailValue =
      email.trim().toLowerCase();

    const passwordValue =
      password.trim();

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!emailValue || !passwordValue) {
      alert(
        "Please enter your email and password."
      );

      return;
    }

    setLoading(true);

    try {
      // =================================================
      // GET USERS
      // =================================================

      const users = getUsers();

      // =================================================
      // GET SINGLE USER
      // =================================================

      const savedUser =
        getSavedUser();

      // =================================================
      // FIND USER
      // =================================================

      let foundUser = null;

      // -------------------------------------------------
      // SEARCH USERS ARRAY
      // -------------------------------------------------

      foundUser = users.find(
        (user) =>
          user?.email
            ?.trim()
            .toLowerCase() ===
            emailValue &&
          user?.password ===
            passwordValue
      );

      // -------------------------------------------------
      // SEARCH SINGLE USER
      // -------------------------------------------------

      if (!foundUser && savedUser) {
        const savedUserEmail =
          savedUser?.email
            ?.trim()
            .toLowerCase();

        if (
          savedUserEmail ===
            emailValue &&
          savedUser?.password ===
            passwordValue
        ) {
          foundUser = savedUser;
        }
      }

      // =================================================
      // USER NOT FOUND
      // =================================================

      if (!foundUser) {
        alert(
          "Invalid email or password."
        );

        return;
      }

      // =================================================
      // CHECK BLOCKED ACCOUNT
      // =================================================

      if (foundUser.blocked === true) {
        alert(
          "Your account has been blocked.\n\n" +
            "Please contact the hotel booking administrator."
        );

        return;
      }

      // =================================================
      // SAVE LOGIN
      // =================================================

      saveLoginSession(
        foundUser,
        "normal"
      );

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "Hotel Booking Login Successful:",
        foundUser
      );

      alert(
        `Welcome to Hotel Booking!\n\n${
          foundUser.name ||
          foundUser.fullName ||
          foundUser.email
        }`
      );

      // =================================================
      // LOGIN SUCCESS → HOME / HOTEL SEARCH
      // =================================================

      navigate(
        "/hotels",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Hotel Booking Login Error:",
        error
      );

      alert(
        "Unable to login right now.\n\nPlease try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = () => {
    /*
     * This is a frontend-only Google login placeholder.
     *
     * For real Google authentication, connect
     * Google Identity Services / Firebase / backend
     * authentication.
     */

    const googleUser = {
      id:
        "google-" +
        Date.now(),

      name:
        "Hotel Guest",

      fullName:
        "Hotel Guest",

      email:
        "guest@google.com",

      picture:
        "",

      loginType:
        "google",
    };

    try {
      saveLoginSession(
        googleUser,
        "google"
      );

      localStorage.setItem(
        "hotelBookingGoogleUser",
        JSON.stringify(
          googleUser
        )
      );

      alert(
        "Google Login Successful!"
      );

      navigate(
        "/hotels",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Google Login Error:",
        error
      );

      alert(
        "Unable to process Google Login."
      );
    }
  };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const handleForgotPassword = () => {
    navigate(
      "/forgot-password"
    );
  };

  // =====================================================
  // CREATE ACCOUNT
  // =====================================================

  const handleCreateAccount = () => {
    navigate(
      "/register"
    );
  };

  // =====================================================
  // DEMO LOGIN
  // =====================================================

  const handleDemoLogin = () => {
    const demoUser = {
      id:
        "demo-" +
        Date.now(),

      name:
        "Hotel Guest",

      fullName:
        "Hotel Guest",

      email:
        "guest@hotelbooking.com",

      password:
        "demo",

      role:
        "GUEST",

      loginType:
        "demo",
    };

    saveLoginSession(
      demoUser,
      "demo"
    );

    alert(
      "Demo Login Successful!"
    );

    navigate(
      "/hotels",
      {
        replace: true,
      }
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="login-page">

      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div
        className="
          login-decoration
          login-decoration-one
        "
      />

      <div
        className="
          login-decoration
          login-decoration-two
        "
      />

      <div
        className="
          login-decoration
          login-decoration-three
        "
      />

      {/* =================================================
          LOGIN CARD
      ================================================= */}

      <div className="login-card">

        {/* =================================================
            HOTEL LOGO
        ================================================= */}

        <div className="login-logo">

          <span className="login-logo-icon">
            🏨
          </span>

          <span className="login-logo-text">
            Hotel
            <span>
              Booking
            </span>
          </span>

        </div>

        {/* =================================================
            HEADING
        ================================================= */}

        <h1>
          Welcome Back
        </h1>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <p className="login-subtitle">
          Login to continue your hotel booking
        </p>

        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form
          onSubmit={handleLogin}
        >

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="login-input-group">

            <label htmlFor="login-email">
              Email Address
            </label>

            <div className="login-input-wrapper">

              <span className="login-input-icon">
                ✉️
              </span>

              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                autoComplete="email"
                required
              />

            </div>

          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="login-input-group">

            <label htmlFor="login-password">
              Password
            </label>

            <div className="login-password-wrapper">

              <span className="login-input-icon">
                🔒
              </span>

              <input
                id="login-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-eye-button"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

          </div>

          {/* =================================================
              REMEMBER ME + FORGOT PASSWORD
          ================================================= */}

          <div className="login-options">

            <label className="remember-label">

              <input
                type="checkbox"
                checked={
                  rememberMe
                }
                onChange={(event) =>
                  setRememberMe(
                    event.target.checked
                  )
                }
              />

              <span>
                Remember me
              </span>

            </label>

            <button
              type="button"
              className="forgot-btn"
              onClick={
                handleForgotPassword
              }
            >
              Forgot Password?
            </button>

          </div>

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            <span>
              {loading
                ? "Signing in..."
                : "Login"}
            </span>

            {!loading && (
              <span className="login-button-arrow">
                →
              </span>
            )}

          </button>

        </form>

        {/* =================================================
            OR DIVIDER
        ================================================= */}

        <div className="login-divider">

          <span />

          <p>
            OR
          </p>

          <span />

        </div>

        {/* =================================================
            GOOGLE LOGIN
        ================================================= */}

        <button
          type="button"
          className="google-login-button"
          onClick={
            handleGoogleLogin
          }
        >
          <span className="google-icon">
            G
          </span>

          <span>
            Continue with Google
          </span>
        </button>

        {/* =================================================
            CREATE ACCOUNT
        ================================================= */}

        <div className="create-account-section">

          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            className="create-account-button"
            onClick={
              handleCreateAccount
            }
          >
            Create New Account
          </button>

        </div>

        {/* =================================================
            DEMO LOGIN
        ================================================= */}

        <button
          type="button"
          className="demo-login-button"
          onClick={
            handleDemoLogin
          }
        >
          Continue as Demo Guest
        </button>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="login-footer">

          <span>
            🏨
          </span>

          <p>
            Find your stay.
            {" "}
            <strong>
              Enjoy your journey.
            </strong>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;
