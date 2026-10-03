import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Resetpassword.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleResetPassword = (e) => {
    e.preventDefault();

    setMessage("");

    // =====================================================
    // CHECK OTP VERIFICATION
    // =====================================================

    const otpVerified = localStorage.getItem(
      "hotelBookingOTPVerified"
    );

    if (otpVerified !== "true") {
      alert("Please verify OTP first.");
      return;
    }

    // =====================================================
    // EMPTY FIELDS
    // =====================================================

    if (!password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    // =====================================================
    // PASSWORD LENGTH
    // =====================================================

    if (password.length < 6) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    // =====================================================
    // PASSWORD MUST CONTAIN LETTER
    // =====================================================

    if (!/[A-Za-z]/.test(password)) {
      alert(
        "Password must contain at least one letter."
      );
      return;
    }

    // =====================================================
    // PASSWORD MUST CONTAIN NUMBER
    // =====================================================

    if (!/\d/.test(password)) {
      alert(
        "Password must contain at least one number."
      );
      return;
    }

    // =====================================================
    // PASSWORD MATCH
    // =====================================================

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // =====================================================
    // GET RESET EMAIL
    // =====================================================

    const resetEmail = localStorage.getItem(
      "hotelBookingResetEmail"
    );

    if (!resetEmail) {
      alert(
        "Password reset session expired. Please request a new OTP."
      );

      navigate("/forgot-password");

      return;
    }

    // =====================================================
    // GET ALL HOTEL BOOKING USERS
    // =====================================================

    const users = JSON.parse(
      localStorage.getItem("hotelBookingUsers") || "[]"
    );

    // =====================================================
    // FIND REGISTERED USER
    // =====================================================

    const userIndex = users.findIndex(
      (user) =>
        user.email?.toLowerCase() ===
        resetEmail.toLowerCase()
    );

    // =====================================================
    // USER NOT FOUND IN USERS ARRAY
    // =====================================================

    if (userIndex === -1) {
      // ===================================================
      // CHECK SINGLE HOTEL BOOKING USER
      // ===================================================

      const savedUser = JSON.parse(
        localStorage.getItem(
          "hotelBookingUser"
        ) || "null"
      );

      if (
        !savedUser ||
        savedUser.email?.toLowerCase() !==
          resetEmail.toLowerCase()
      ) {
        alert(
          "User account not found. Please register first."
        );

        return;
      }

      // ===================================================
      // UPDATE SINGLE USER
      // ===================================================

      const updatedUser = {
        ...savedUser,
        password: password,
      };

      localStorage.setItem(
        "hotelBookingUser",
        JSON.stringify(updatedUser)
      );

      // ===================================================
      // ALSO UPDATE CURRENT USER IF AVAILABLE
      // ===================================================

      const currentUser = JSON.parse(
        localStorage.getItem(
          "hotelBookingCurrentUser"
        ) || "null"
      );

      if (
        currentUser &&
        currentUser.email?.toLowerCase() ===
          resetEmail.toLowerCase()
      ) {
        localStorage.setItem(
          "hotelBookingCurrentUser",
          JSON.stringify({
            ...currentUser,
            password: password,
          })
        );
      }

    } else {
      // ===================================================
      // UPDATE USER INSIDE USERS ARRAY
      // ===================================================

      const updatedUsers = [...users];

      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        password: password,
      };

      localStorage.setItem(
        "hotelBookingUsers",
        JSON.stringify(updatedUsers)
      );

      // ===================================================
      // UPDATE SINGLE USER IF IT EXISTS
      // ===================================================

      const savedUser = JSON.parse(
        localStorage.getItem(
          "hotelBookingUser"
        ) || "null"
      );

      if (
        savedUser &&
        savedUser.email?.toLowerCase() ===
          resetEmail.toLowerCase()
      ) {
        localStorage.setItem(
          "hotelBookingUser",
          JSON.stringify({
            ...savedUser,
            password: password,
          })
        );
      }
    }

    // =====================================================
    // CLEAR RESET DATA
    // =====================================================

    localStorage.removeItem(
      "hotelBookingOTPVerified"
    );

    localStorage.removeItem(
      "hotelBookingOTPVerifiedAt"
    );

    localStorage.removeItem(
      "hotelBookingResetOTP"
    );

    localStorage.removeItem(
      "hotelBookingResetOTPExpiry"
    );

    localStorage.removeItem(
      "hotelBookingResetEmail"
    );

    localStorage.removeItem(
      "hotelBookingResetUserId"
    );

    // =====================================================
    // LOGOUT
    // =====================================================

    localStorage.removeItem(
      "hotelBookingLoggedIn"
    );

    localStorage.removeItem(
      "hotelBookingLoginType"
    );

    // =====================================================
    // SUCCESS
    // =====================================================

    setMessage(
      "✓ Password changed successfully!"
    );

    // =====================================================
    // GO TO LOGIN
    // =====================================================

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  // =====================================================
  // BACK TO LOGIN
  // =====================================================

  const handleBackToLogin = () => {
    localStorage.removeItem(
      "hotelBookingOTPVerified"
    );

    localStorage.removeItem(
      "hotelBookingOTPVerifiedAt"
    );

    localStorage.removeItem(
      "hotelBookingResetOTP"
    );

    localStorage.removeItem(
      "hotelBookingResetOTPExpiry"
    );

    localStorage.removeItem(
      "hotelBookingResetEmail"
    );

    localStorage.removeItem(
      "hotelBookingResetUserId"
    );

    localStorage.removeItem(
      "hotelBookingLoggedIn"
    );

    localStorage.removeItem(
      "hotelBookingLoginType"
    );

    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="reset-page">

      <div className="reset-card">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="reset-logo">
          🏨 <span>Hotel Booking</span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1>
          Reset Password
        </h1>

        <p className="reset-subtitle">
          Create a new password for your
          Hotel Booking account.
        </p>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleResetPassword}
        >

          {/* =================================================
              NEW PASSWORD
          ================================================= */}

          <div className="reset-input-group">

            <label>
              New Password
            </label>

            <div className="reset-password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="Enter new password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                autoComplete="new-password"
              />

              {/* =================================================
                  EYE BUTTON
              ================================================= */}

              <button
                type="button"
                className="reset-eye-button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                title={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }

              >
                👁️
              </button>

            </div>

          </div>

          {/* =================================================
              CONFIRM PASSWORD
          ================================================= */}

          <div className="reset-input-group">

            <label>
              Confirm Password
            </label>

            <div className="reset-password-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }

                placeholder="Confirm new password"

                value={confirmPassword}

                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }

                autoComplete="new-password"
              />

              {/* =================================================
                  EYE BUTTON
              ================================================= */}

              <button
                type="button"
                className="reset-eye-button"

                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }

                title={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }

              >
                👁️
              </button>

            </div>

          </div>

          {/* =================================================
              PASSWORD HINT
          ================================================= */}

          <div className="reset-password-hint">
            Password must contain at least 6 characters,
            one letter, and one number.
          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {message && (
            <div className="reset-message success">
              {message}
            </div>
          )}

          {/* =================================================
              CHANGE PASSWORD BUTTON
          ================================================= */}

          <button
            type="submit"
            className="reset-button"
          >
            Change Password
          </button>

        </form>

        {/* =================================================
            BACK TO LOGIN
        ================================================= */}

        <button
          type="button"
          className="reset-back-button"
          onClick={handleBackToLogin}
        >
          ← Back to Login
        </button>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p className="reset-demo">
          Hotel Booking Management System
        </p>

      </div>

    </div>
  );
}

export default ResetPassword;