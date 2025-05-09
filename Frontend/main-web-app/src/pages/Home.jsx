import "../styles/home.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { MdApps } from "react-icons/md";
import homeVideo from "../video/home.mp4";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />

      <section className="first-section">
        <div className="open-text">
          <h2>Laptop Refurbishment</h2>
          <p>High-quality refurbished laptops for your needs</p>
          <button className="shop-btn">
            <Link
              to="/inventory"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Shop Now
            </Link>
          </button>
        </div>

        <div className="video-container">
          <video
            src={homeVideo}
            className="video"
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="grid-section">
        <div className="grid-card">
          <div className="image-placeholder2">
            <img
              src={"/images/INVENTORY.png"}
              alt="inventory"
              style={{
                maxWidth: "200px",
                maxHeight: "180px",
                borderRadius: "12px",
              }}
            />
          </div>
          <div className="inventory-heading">
            <h4>Available Inventory</h4>
            <nav className="nav-center">
              <div className="inventory-link">
                <Link to="/inventory">Inventory</Link>
              </div>
            </nav>
            <p>Browse our selection of refurbished laptops</p>
          </div>
        </div>

        <div className="grid-card">
          <div className="image-placeholder2">
            <img
              src={"/images/store.jpg"}
              alt="quick-access-img"
              style={{
                maxWidth: "200px",
                maxHeight: "180px",
                borderRadius: "12px",
              }}
            />
          </div>
          <div className="quick-access-heading">
            <h4>
              <MdApps style={{ marginRight: "5px", verticalAlign: "middle" }} />
              Quick Access
            </h4>
            <p>Everything you need, right here</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-box">
          <h3>250+</h3>
          <p>Laptops in Stock</p>
        </div>
        <div className="stat-box">
          <h3>30-Day</h3>
          <p>Warranty</p>
        </div>
        <div className="stat-box">
          <h3>1000+</h3>
          <p>Satisfied Customers</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
