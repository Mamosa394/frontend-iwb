import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import "../styles/LoadingScreen.css";
import robotImage from "/images/ROBOT.png";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p>Logging you in, please wait...</p>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://backend-8-gn1i.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/home-page");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="login-page-body">
      <div className="login-page-container">
        {/* Left Panel */}
        <div className="login-page-left-panel-container">
          <div className="login-page-left-panel">
            <div className="login-page-robot-container">
              <img
                src={robotImage}
                alt="Robot"
                className="login-page-robot-img"
              />
              <p className="login-page-knee-caption">
                YOUR IDEAS START HERE!
                <br />
                LOG IN TO MAKE THEM REAL.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-page-right-panel-container">
          <div className="login-page-right-panel">
            <div className="login-page-signup-form-box">
              <div className="login-page-glow-border"></div>
              <h2>Welcome back</h2>
              <p className="login-page-login-text">
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>

              <form onSubmit={handleSubmit} className="login-page-form">
                {/* Email Input */}
                <div className="login-page-input-wrapper">
                  <i className="login-page-input-icon fas fa-envelope"></i>
                  <input
                    type="email"
                    className="login-page-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="login-page-input-wrapper">
                  <i className="login-page-input-icon fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="login-page-input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <i
                    className={`password-toggle fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>

                {error && <p className="login-page-error">{error}</p>}

                <button
                  type="submit"
                  className="login-page-signup-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
