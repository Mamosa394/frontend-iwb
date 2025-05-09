import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/OtpVerification.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return (
      <p className="otp-error">Email not provided. Please sign up again.</p>
    );
  }

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, ""); // Only digits

    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value.length === 1 && element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: enteredOTP }),
          credentials: "include", // Ensure the session cookie is sent with the request
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Invalid OTP.");
        setSuccess("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2>OTP Verification</h2>
        <p>
          Enter OTP sent to <b>{email}</b>
        </p>
        <form onSubmit={handleSubmit} className="otp-input-form">
          <div className="otp-input-group">
            {otp.map((data, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, i)}
                onFocus={(e) => e.target.select()}
                className="otp-input-box"
                style={{ color: "white" }}
              />
            ))}
          </div>

          {error && <p className="otp-error">{error}</p>}
          {success && <p className="otp-success">{success}</p>}

          <button type="submit" className="otp-verify-btn">
            Verify & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
