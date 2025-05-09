import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import "../styles/SignUp.css";
import "../styles/LoadingScreen.css";
import robotImage from "/images/ROBOT.png";
import logo from "/images/logo.jpg";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Signing you up, please wait...</p>
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminCode: "",
    userType: "Investor", // Default user type is Investor
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdminToggle = () => {
    setIsAdmin((prev) => !prev);
    setFormData({ ...formData, adminCode: "" });
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://backend-8-gn1i.onrender.com/api/auth/signup",
        {
          ...formData,
          isAdmin,
        }
      );

      setSuccess(res.data.message || "Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="signup-ui-container">
      <div className="left-panel">
        <div className="robot-wrapper">
          <img src={robotImage} alt="Robot" className="robot-img" />
          <div className="knee-caption">IWB Technologies</div>
        </div>
      </div>

      <div className="right-panel">
        <div className="signup-form-box">
          <div className="glow-border"></div>

          <h2>{isAdmin ? "Admin Registration" : "Create an account"}</h2>

          <div className="logo-wrapper">
            <img src={logo} alt="logo" className="logo" />
          </div>

          <p className="login-text">
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="sign-input"
                required
                minLength={3}
                maxLength={20}
              />
            </div>

            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="sign-input"
                required
              />
            </div>

            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="sign-input"
                required
                minLength={6}
              />
            </div>

            {isAdmin && (
              <div className="input-wrapper">
                <FaShieldAlt className="input-icon" />
                <input
                  type="password"
                  name="adminCode"
                  placeholder="Admin Registration Code"
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="sign-input"
                  required
                />
              </div>
            )}

            {/* User Type Selection */}
            <div className="user-type-selection">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="Investor"
                  checked={formData.userType === "Investor"}
                  onChange={handleUserTypeChange}
                />
                Investor
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="Developer"
                  checked={formData.userType === "Developer"}
                  onChange={handleUserTypeChange}
                />
                Developer
              </label>
            </div>

            <div className="terms">
              <input type="checkbox" required className="tick" id="terms" />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                id="adminMode"
                className="tick"
                checked={isAdmin}
                onChange={handleAdminToggle}
              />
              <label htmlFor="adminMode">Register as Admin</label>
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {isAdmin ? "Register Admin" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
