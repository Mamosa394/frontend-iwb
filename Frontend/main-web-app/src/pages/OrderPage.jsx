import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/orderpage.css";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-8-gn1i.onrender.com";

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch product details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.item) {
      setProduct(location.state.item);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [id, location.state]);

  const handleBuy = async () => {
    try {
      if (!product?._id || !product.price) {
        alert("Invalid product data.");
        return;
      }

      if (!/^\d{13,19}$/.test(cardNumber)) {
        alert("Invalid card number. Please enter 13–19 digits.");
        return;
      }

      const sale = {
        productId: product._id,
        paymentDetails: {
          paymentMethod: "Card",
          cardNumber: cardNumber.trim(),
          totalAmount: product.price,
        },
      };

      console.log("Submitting sale:", sale);

      const response = await axios.post(`${BASE_URL}/api/sales`, sale);
      alert("Purchase successful! Sale ID: " + response.data._id);
      setCardNumber("");
    } catch (err) {
      console.error(
        "Error during purchase:",
        err.response?.data || err.message
      );
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      alert("Purchase failed: " + errorMessage);
    }
  };

  if (loading)
    return <div className="order-loading">Loading product details...</div>;
  if (error) return <div className="order-error">Error: {error}</div>;
  if (!product) return <div className="order-error">Product not found</div>;

  return (
    <div className="order-container">
      <div className="order-info">
        <h2>{product.name}</h2>

        {/* Specifications */}
        <div className="specs-section">
          <h3>Specifications</h3>
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Type:</span> {product.type}
            </div>
            <div className="spec-item">
              <span className="spec-label">CPU:</span> {product.specs?.cpu}
            </div>
            <div className="spec-item">
              <span className="spec-label">RAM:</span> {product.specs?.ram}
            </div>
            <div className="spec-item">
              <span className="spec-label">Storage:</span>{" "}
              {product.specs?.storage}
            </div>
            <div className="spec-item">
              <span className="spec-label">GPU:</span> {product.specs?.gpu}
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="product-meta">
          <p>
            <strong>Status:</strong> {product.status}
          </p>
          <p>
            <strong>Price:</strong> M{product.price}
          </p>
        </div>

        {/* Card Number Input */}
        <div className="card-input-container">
          <label htmlFor="cardNumber" className="card-label">
            Card Number:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="card-input"
            placeholder="Enter your card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            maxLength={19}
          />
        </div>

        {/* Buy Button */}
        <button className="confirm-buy-btn" onClick={handleBuy}>
          Confirm Purchase
        </button>
      </div>

      <div className="order-image">
        <img src={product.image || "/images/Wallet.gif"} alt={product.name} />
      </div>
    </div>
  );
};

export default OrderPage;
