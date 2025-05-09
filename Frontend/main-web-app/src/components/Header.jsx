import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/header.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      // Close menu when resizing to desktop view
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-container">
          <img src="/images/logo.jpg" alt="IWB Logo" className="logo-image" />
          <h1 className="logo-text">
            {isMobileView ? "IWB" : "IWB Technologies"}
          </h1>
        </div>

        {/* Moved logout button here */}
        {!isMobileView && (
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>

      <div className={`nav-center ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/home-page" onClick={closeMobileMenu}>
          Home
        </Link>
        <Link to="/inventory" onClick={closeMobileMenu}>
          Inventory
        </Link>
        <Link to="/query-form" onClick={closeMobileMenu}>
          Queries
        </Link>
        <Link to="/about" onClick={closeMobileMenu}>
          About
        </Link>

        {/* Mobile-only logout button */}
        {isMobileView && isMobileMenuOpen && (
          <button className="logout-btn mobile-logout" onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Desktop-only logout button (hidden in mobile) */}
      {!isMobileView && (
        <div className="header-right">
          {/* Empty in desktop view since logout is on left */}
        </div>
      )}
    </header>
  );
};

export default Header;
