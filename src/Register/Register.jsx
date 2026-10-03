import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Signup() {
  const navigate = useNavigate();

  // =====================================================
  // FORM STATES
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // =====================================================
  // PASSWORD VALIDATION
  // =====================================================

  const validatePassword = (passwordValue) => {
    if (passwordValue.length < 8) {
      return "Password must contain at least 8 characters";
    }

    if (!/[A-Z]/.test(passwordValue)) {
      return "Password must contain at least 1 uppercase letter";
    }

    if (!/[a-z]/.test(passwordValue)) {
      return "Password must contain at least 1 lowercase letter";
    }

    if (!/[0-9]/.test(passwordValue)) {
      return "Password must contain at least 1 number";
    }

    if (!/[!@#$%^&*]/.test(passwordValue)) {
      return "Password must contain at least 1 special character";
    }

    return "";
  };

  // =====================================================
  // EMAIL VALIDATION
  // =====================================================

  const validateEmail = (emailValue) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);
  };

  // =====================================================
  // SIGNUP / REGISTER
  // =====================================================

  const handleSignup = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    // ===================================================
    // CHECK EMPTY FIELDS
    // ===================================================

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // ===================================================
    // NAME VALIDATION
    // ===================================================

    const nameValue = name.trim();

    if (nameValue.length < 2) {
      alert("Please enter your full name");
      return;
    }

    // ===================================================
    // EMAIL VALIDATION
    // ===================================================

    const emailValue = email.trim().toLowerCase();

    if (!validateEmail(emailValue)) {
      alert("Please enter a valid email address");
      return;
    }

    // ===================================================
    // PASSWORD VALIDATION
    // ===================================================

    const passwordError = validatePassword(password);

    if (passwordError) {
      alert(passwordError);
      return;
    }

    // ===================================================
    // CONFIRM PASSWORD
    // ===================================================

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ===================================================
    // GET HOTEL BOOKING USERS
    // =====================================================

    let users = [];

    try {
      users = JSON.parse(
        localStorage.getItem("hotelBookingUsers") || "[]"
      );

      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (error) {
      console.error(
        "Unable to read hotel booking users:",
        error
      );

      users = [];
    }

    // ===================================================
    // CHECK EMAIL ALREADY EXISTS
    // ===================================================

    const existingUser = users.find(
      (user) =>
        user?.email?.toLowerCase() === emailValue
    );

    if (existingUser) {
      alert(
        "This email is already registered. Please login."
      );

      navigate("/login");

      return;
    }

    // ===================================================
    // CREATE NEW HOTEL BOOKING USER
    // ===================================================

    const newUser = {
      id: Date.now(),
      name: nameValue,
      email: emailValue,
      password: password,
      role: "CUSTOMER",
      accountType: "HOTEL_BOOKING_USER",
      createdAt: new Date().toISOString()
    };

    // ===================================================
    // ADD USER
    // ===================================================

    users.push(newUser);

    // ===================================================
    // SAVE USERS
    // ===================================================

    localStorage.setItem(
      "hotelBookingUsers",
      JSON.stringify(users)
    );

    // ===================================================
    // SAVE CURRENT USER
    // ===================================================

    localStorage.setItem(
      "hotelBookingCurrentUser",
      JSON.stringify(newUser)
    );

    // ===================================================
    // SAVE USER DETAILS
    // ===================================================

    localStorage.setItem(
      "hotelBookingUser",
      JSON.stringify(newUser)
    );

    localStorage.setItem(
      "hotelBookingUserName",
      newUser.name
    );

    localStorage.setItem(
      "hotelBookingUserEmail",
      newUser.email
    );

    localStorage.setItem(
      "hotelBookingUserId",
      String(newUser.id)
    );

    localStorage.setItem(
      "hotelBookingLoginType",
      "REGISTER"
    );

    // ===================================================
    // ACCOUNT CREATED
    // ===================================================

    setLoading(true);

    alert(
      "Hotel Booking account created successfully!"
    );

    // ===================================================
    // CLEAR FORM
    // ===================================================

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setShowPassword(false);
    setShowConfirmPassword(false);

    setLoading(false);

    // ===================================================
    // GO TO LOGIN
    // ===================================================

    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* =================================================
            HOTEL BOOKING LOGO
        ================================================= */}

        <div className="signup-logo">
          🏨
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1>
          Create Your Account
        </h1>

        <p className="signup-subtitle">
          Register for a Hotel Booking account
        </p>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSignup}>

          {/* =================================================
              FULL NAME
          ================================================= */}

          <div className="signup-input-group">

            <label htmlFor="signup-name">
              Full Name
            </label>

            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="name"
              disabled={loading}
            />

          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="signup-input-group">

            <label htmlFor="signup-email">
              Email Address
            </label>

            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              disabled={loading}
            />

          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="signup-input-group">

            <label htmlFor="signup-password">
              Password
            </label>

            <div className="password-wrapper">

              <input
                id="signup-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                disabled={loading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

            <p className="password-hint">
              Use 8+ characters with uppercase,
              lowercase, number and special character.
            </p>

          </div>

          {/* =================================================
              CONFIRM PASSWORD
          ================================================= */}

          <div className="signup-input-group">

            <label htmlFor="signup-confirm-password">
              Confirm Password
            </label>

            <div className="password-wrapper">

              <input
                id="signup-confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
                disabled={loading}
              >
                {showConfirmPassword
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

          </div>

          {/* =================================================
              CREATE ACCOUNT BUTTON
          ================================================= */}

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Hotel Booking Account"}
          </button>

        </form>

        {/* =================================================
            LOGIN
        ================================================= */}

        <div className="signup-login">

          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        </div>

        {/* =================================================
            HOTEL BOOKING INFORMATION
        ================================================= */}

        <div className="signup-info">

          <span>
            🏨
          </span>

          <p>
            Create an account to search hotels,
            explore rooms and manage your bookings.
          </p>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p className="signup-demo">
          Hotel Booking Management System
        </p>

      </div>

    </div>
  );
}

export default Signup;