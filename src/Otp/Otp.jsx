import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./OTP.css";

function OTP() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    setMessage("");

    // -------------------------------------------------
    // EMPTY OTP
    // -------------------------------------------------

    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }

    // -------------------------------------------------
    // OTP MUST CONTAIN ONLY NUMBERS
    // -------------------------------------------------

    if (!/^\d+$/.test(otp)) {
      setMessage("OTP must contain only numbers.");
      return;
    }

    // -------------------------------------------------
    // OTP LENGTH
    // -------------------------------------------------

    if (otp.length !== 6) {
      setMessage("OTP must contain 6 digits.");
      return;
    }

    // -------------------------------------------------
    // GET SAVED HOTEL BOOKING OTP
    // -------------------------------------------------

    const savedOTP = localStorage.getItem(
      "hotelBookingResetOTP"
    );

    if (!savedOTP) {
      setMessage(
        "OTP not found. Please request a new OTP."
      );
      return;
    }

    // -------------------------------------------------
    // CHECK OTP EXPIRY
    // -------------------------------------------------

    const expiryTime = localStorage.getItem(
      "hotelBookingResetOTPExpiry"
    );

    if (
      expiryTime &&
      Date.now() > Number(expiryTime)
    ) {
      localStorage.removeItem(
        "hotelBookingResetOTP"
      );

      localStorage.removeItem(
        "hotelBookingResetOTPExpiry"
      );

      setMessage(
        "OTP expired. Please request a new OTP."
      );

      return;
    }

    // -------------------------------------------------
    // CHECK OTP
    // -------------------------------------------------

    if (otp !== savedOTP) {
      setMessage(
        "Invalid OTP. Please enter the correct OTP."
      );

      return;
    }

    // =================================================
    // OTP CORRECT
    // =================================================

    setLoading(true);

    setMessage(
      "✓ OTP verified successfully!"
    );

    // -------------------------------------------------
    // SAVE VERIFIED STATUS
    // -------------------------------------------------

    localStorage.setItem(
      "hotelBookingOTPVerified",
      "true"
    );

    // -------------------------------------------------
    // SAVE VERIFICATION TIME
    // -------------------------------------------------

    localStorage.setItem(
      "hotelBookingOTPVerifiedAt",
      String(Date.now())
    );

    // -------------------------------------------------
    // REMOVE USED OTP
    // -------------------------------------------------

    localStorage.removeItem(
      "hotelBookingResetOTP"
    );

    localStorage.removeItem(
      "hotelBookingResetOTPExpiry"
    );

    // =================================================
    // GO TO RESET PASSWORD
    // =================================================

    setTimeout(() => {
      navigate("/reset-password");
    }, 800);
  };

  // =====================================================
  // BACK TO LOGIN
  // =====================================================

  const handleBackToLogin = () => {
    if (loading) {
      return;
    }

    // -------------------------------------------------
    // CLEAR HOTEL BOOKING OTP DATA
    // -------------------------------------------------

    localStorage.removeItem(
      "hotelBookingResetOTP"
    );

    localStorage.removeItem(
      "hotelBookingResetOTPExpiry"
    );

    localStorage.removeItem(
      "hotelBookingOTPVerified"
    );

    localStorage.removeItem(
      "hotelBookingOTPVerifiedAt"
    );

    localStorage.removeItem(
      "hotelBookingResetEmail"
    );

    localStorage.removeItem(
      "hotelBookingResetUserId"
    );

    // -------------------------------------------------
    // GO TO LOGIN
    // -------------------------------------------------

    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="otp-page">

      <div className="otp-card">

        {/* =================================================
            HOTEL BOOKING LOGO
        ================================================= */}

        <div className="otp-logo">
          🏨
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1>
          Verify Your Email
        </h1>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <p className="otp-subtitle">
          Enter the 6-digit verification code
          sent to your registered email address.
        </p>

        {/* =================================================
            HOTEL BOOKING INFORMATION
        ================================================= */}

        <div className="otp-info">
          <span>
            🔐
          </span>

          <p>
            For your security, please enter the
            verification code to continue resetting
            your Hotel Booking account password.
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleVerifyOTP}>

          {/* =================================================
              OTP INPUT
          ================================================= */}

          <div className="otp-input-group">

            <label htmlFor="hotel-booking-otp">
              Enter OTP
            </label>

            <input
              id="hotel-booking-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              disabled={loading}
              onChange={(e) => {
                const value =
                  e.target.value.replace(/\D/g, "");

                setOtp(value);
                setMessage("");
              }}
            />

            <p className="otp-hint">
              Enter the 6-digit code from your email.
            </p>

          </div>

          {/* =================================================
              MESSAGE
          ================================================= */}

          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "otp-message otp-success"
                  : "otp-message otp-error"
              }
            >
              {message}
            </div>
          )}

          {/* =================================================
              VERIFY BUTTON
          ================================================= */}

          <button
            type="submit"
            className="otp-verify-button"
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        {/* =================================================
            BACK TO LOGIN
        ================================================= */}

        <button
          type="button"
          className="back-login-button"
          onClick={handleBackToLogin}
          disabled={loading}
        >
          ← Back to Login
        </button>

        {/* =================================================
            HOTEL BOOKING FOOTER
        ================================================= */}

        <p className="otp-demo">
          Hotel Booking Management System
        </p>

      </div>

    </div>
  );
}

export default OTP;