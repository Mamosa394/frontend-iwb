import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import "../styles/SignUp.css";
import "../styles/LoadingScreen.css";
import robotImage from "/images/ROBOT.png";
import logo from "/images/logo.jpg";

const LoadingScreen = () => (
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

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminCode: "",
    role: "User", // Default role is User
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle role selection change
  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value, adminCode: "" }); // Reset adminCode when switching role
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
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role.toLowerCase(),
          adminCode: formData.role === "Admin" ? formData.adminCode : undefined, // Send adminCode only for Admin role
        }
      );

      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
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

          <h2>
            {formData.role === "Admin"
              ? "Admin Registration"
              : "Create an account"}
          </h2>

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
            {/* Username Input */}
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

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Admin Code (Only for Admin Role) */}
            {formData.role === "Admin" && (
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

            {/* Role Selection Dropdown */}
            <div className="role-selection">
              <label htmlFor="role">Select Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="role-dropdown"
                required
              >
                <option value="User">User</option>
                <option value="Developer">Developer</option>
                <option value="Admin">Admin</option>
                <option value="Investor">Investor</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="terms">
              <input type="checkbox" required className="tick" id="terms" />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {formData.role === "Admin" ? "Register Admin" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
