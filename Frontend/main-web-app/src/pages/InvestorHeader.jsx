import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/investorHeader.css";

const InvestorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="investor-header">
      <div className="header-left">
        <h1 className="header-title">Investor Dashboard</h1>
      </div>
      <div className="header-right">
        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/net-income" className="nav-link">
            Home
          </Link>
          <Link to="/project-chart" className="nav-link">
            Project Charts
          </Link>
          <Link to="/forex" className="nav-link">
            Forex Overview
          </Link>
          <Link to="/stock-analysis" className="nav-link">
            Stock Analysis
          </Link>
          <Link to="/market-trends" className="nav-link">
            Market Trends
          </Link>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
};

export default InvestorHeader;
