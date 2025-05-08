import  { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminInventory.css";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://backend-8-gn1i.onrender.com/api/products");
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
      await axios.delete(`https://backend-8-gn1i.onrender.com/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setActionMessage("Product has been deleted successfully! 🧹");
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    }
  };

  // Mock update product
  const handleUpdateProduct = (id) => {
    setActionMessage(`Product with ID ${id} has been updated! ✏️`);
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div
      className={`admin-inventory-container ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Collapsible Sidebar */}
      <AdminSidebar collapsed={isCollapsed} toggleSidebar={toggleSidebar} />

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

        {actionMessage && (
          <div className="action-message">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {actionMessage}
            </motion.div>
          </div>
        )}

        {/* Product Grid */}
        <div className="inventory-grid">
          {products.map((product) => (
            <div className="inventory-card" key={product._id}>
              <img
                src={`https://backend-8-gn1i.onrender.com${product.image}`}
                alt={product.name}
                className="inventory-img"
              />
              <div className="inventory-info">
                <h3>{product.name}</h3>
                <p>Price: M {product.price}</p>
                <p>Type: {product.type}</p>
                <div className="card-actions">
                  <button onClick={() => handleUpdateProduct(product._id)}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
