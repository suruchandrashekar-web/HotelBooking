import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Forgotpassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // =====================================================
    // EMPTY EMAIL
    // =====================================================

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    // =====================================================
    // CLEAN EMAIL
    // =====================================================

    const emailValue = email.trim().toLowerCase();

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid email address.");
      return;
    }

    // =====================================================
    // GET ALL HOTEL BOOKING USERS
    // =====================================================

    const users = JSON.parse(
      localStorage.getItem("hotelBookingUsers") || "[]"
    );

    // =====================================================
    // FIND REGISTERED HOTEL BOOKING USER
    // =====================================================

    let registeredUser = users.find(
      (user) => user.email?.toLowerCase() === emailValue
    );

    // =====================================================
    // ALSO CHECK SINGLE CURRENT USER
    // =====================================================

    if (!registeredUser) {
      const savedUser = JSON.parse(
        localStorage.getItem("hotelBookingUser") || "null"
      );

      if (
        savedUser &&
        savedUser.email?.toLowerCase() === emailValue
      ) {
        registeredUser = savedUser;
      }
    }

    // =====================================================
    // ALSO CHECK CURRENT USER OBJECT
    // =====================================================

    if (!registeredUser) {
      const currentUser = JSON.parse(
        localStorage.getItem("hotelBookingCurrentUser") || "null"
      );

      if (
        currentUser &&
        currentUser.email?.toLowerCase() === emailValue
      ) {
        registeredUser = currentUser;
      }
    }

    // =====================================================
    // EMAIL NOT REGISTERED
    // =====================================================

    if (!registeredUser) {
      alert(
        "This email is not registered. Please create a Hotel Booking account first."
      );
      return;
    }

    // =====================================================
    // GENERATE 6 DIGIT OTP
    // =====================================================

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated Hotel Booking OTP:", otp);

    // =====================================================
    // SAVE OTP
    // =====================================================

    localStorage.setItem(
      "hotelBookingResetOTP",
      otp
    );

    // =====================================================
    // SAVE EMAIL
    // =====================================================

    localStorage.setItem(
      "hotelBookingResetEmail",
      emailValue
    );

    // =====================================================
    // OTP EXPIRY - 15 MINUTES
    // =====================================================

    const expiryTime =
      Date.now() + 15 * 60 * 1000;

    localStorage.setItem(
      "hotelBookingResetOTPExpiry",
      expiryTime.toString()
    );

    // =====================================================
    // SAVE USER ID
    // =====================================================

    if (registeredUser.id) {
      localStorage.setItem(
        "hotelBookingResetUserId",
        registeredUser.id.toString()
      );
    }

    // =====================================================
    // EMAILJS PARAMETERS
    // =====================================================

    const templateParams = {
      email: emailValue,
      passcode: otp,
      time: "15 minutes",
      name: registeredUser.name || "Hotel Booking User",
    };

    // =====================================================
    // SEND EMAIL
    // =====================================================

    try {
      setLoading(true);

      // ===================================================
      // EMAILJS PUBLIC KEY
      // ===================================================

      emailjs.init("acu-D5P21dGPIRx7B");

      // ===================================================
      // SEND EMAIL
      // ===================================================

      const response = await emailjs.send(
        "service_ajt7m0r",
        "template_6g3frb4",
        templateParams
      );

      console.log(
        "Hotel Booking OTP Email Sent Successfully:",
        response
      );

      // ===================================================
      // SUCCESS
      // ===================================================

      alert(
        "OTP sent successfully to your registered email."
      );

      // ===================================================
      // GO TO OTP PAGE
      // App.jsx path = /otp
      // ===================================================

      navigate("/otp");

    } catch (error) {
      console.error(
        "EmailJS Error:",
        error
      );

      // ===================================================
      // REMOVE OTP IF EMAIL FAILED
      // ===================================================

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

      alert(
        "OTP sending failed. Please check your EmailJS configuration and try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // BACK TO LOGIN
  // =====================================================

  const handleBackToLogin = () => {
    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="forgot-logo">
          🏨 <span>Hotel Booking</span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1>
          Forgot Password?
        </h1>

        <p className="forgot-subtitle">
          Enter your registered email address.
          We will send you a One Time Password (OTP)
          to reset your Hotel Booking account password.
        </p>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSendOtp}>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="forgot-input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
              autoComplete="email"
            />

          </div>

          {/* =================================================
              SEND OTP BUTTON
          ================================================= */}

          <button
            type="submit"
            className="forgot-reset-button"
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
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
            INFO
        ================================================= */}

        <div className="forgot-info">
          <span className="forgot-info-icon">
            🔐
          </span>

          <p>
            Your OTP will be valid for
            <strong> 15 minutes</strong>.
            Please do not share your OTP with anyone.
          </p>
        </div>

        {/* =================================================
            DEMO TEXT
        ================================================= */}

        <p className="forgot-demo">
          Hotel Booking Management System
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;