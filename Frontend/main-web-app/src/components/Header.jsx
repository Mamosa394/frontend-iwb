import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/images/logo.jpg" alt="IWB Logo" className="logo-image" />
        <h1 className="logo-text">IWB Technologies</h1>
      </div>

      <nav className="nav-center">
        <Link to="/home-page">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/net-income">Investors Hub</Link>
        <Link to="/query-form">Queries</Link>
   
        <Link to="/about">About</Link>

      </nav>

      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
