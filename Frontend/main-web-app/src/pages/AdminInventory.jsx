import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminInventory.css";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-8-gn1i.onrender.com/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://backend-8-gn1i.onrender.com/api/products/${id}`
      );
      setProducts(products.filter((product) => product._id !== id));
      setActionMessage("Product has been deleted successfully! 🧹");
      setTimeout(() => setActionMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    }
  };

  // Update product
  const handleUpdateProduct = (id) => {
    setActionMessage(`Product with ID ${id} has been updated! ✏️`);
    setTimeout(() => setActionMessage(""), 3000);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileSidebar(!showMobileSidebar);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div
      className={`admin-inventory-container ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <svg viewBox="0 0 24 24">
            {showMobileSidebar ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            )}
          </svg>
        </button>
      )}

      {/* Sidebar - Desktop and Mobile */}
      <AnimatePresence>
        {(!isMobile || showMobileSidebar) && (
          <motion.div
            initial={isMobile ? { x: -300 } : {}}
            animate={isMobile ? { x: 0 } : {}}
            exit={isMobile ? { x: -300 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AdminSidebar
              collapsed={isCollapsed}
              toggleSidebar={toggleSidebar}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {isMobile && showMobileSidebar && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* Main Inventory Area */}
      <div className="inventory-content">
        <header className="admin-header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Inventory Management
          </motion.h1>
        </header>

        {/* Action Message */}
        <AnimatePresence>
          {actionMessage && (
            <motion.div
              className="action-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {actionMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="inventory-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <motion.div
                className="inventory-card"
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <img
                  src={`https://backend-8-gn1i.onrender.com${product.image}`}
                  alt={product.name}
                  className="inventory-img"
                  loading="lazy"
                />
                <div className="inventory-info">
                  <h3>{product.name}</h3>
                  <p>Price: M {product.price}</p>
                  <p>Type: {product.type}</p>
                  <div className="card-actions">
                    <button
                      onClick={() => handleUpdateProduct(product._id)}
                      className="update-btn"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
