import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const location = useLocation();
  const { id: paramId } = useParams(); // fallback if using URL param
  const navigate = useNavigate();

  const item = location.state?.item || {};
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const productId = item?._id || paramId;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(
          "Error fetching product:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.error ||
            "An error occurred while fetching the product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="order-loading">Loading product...</div>;

  if (error)
    return (
      <div className="order-error">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      {product && (
        <div className="order-product">
          <img
            src={product.image}
            alt={product.name}
            className="order-product-image"
          />
          <div className="order-product-info">
            <h3>{product.name}</h3>
            <p>Type: {product.type}</p>
            <p>CPU: {product.specs?.cpu}</p>
            <p>RAM: {product.specs?.ram}</p>
            <p>Storage: {product.specs?.storage}</p>
            <p>GPU: {product.specs?.gpu}</p>
            <p>Price: M{product.price}</p>
            <p>Status: {product.status}</p>
            <p>Tags: {product.tags?.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
