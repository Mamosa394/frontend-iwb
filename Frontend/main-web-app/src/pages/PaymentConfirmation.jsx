import React, { useState } from "react";
import "../styles/payment.css"; // Add custom styles here
import { useNavigate } from "react-router-dom";

const PaymentConfirmation = () => {
  const [paymentStatus, setPaymentStatus] = useState(null); // Track payment status
  const [paymentMessage, setPaymentMessage] = useState(""); // Payment message to show to the user
  const navigate = useNavigate();

  const handlePayment = () => {
    setPaymentStatus("Processing...");

    // Simulating payment delay with setTimeout
    setTimeout(() => {
      const isPaymentSuccessful = Math.random() > 0.5; // Random success or failure

      if (isPaymentSuccessful) {
        setPaymentStatus("Success!");
        setPaymentMessage("Your payment was successful. Thank you for your purchase!");
      } else {
        setPaymentStatus("Failed");
        setPaymentMessage("Oops! Payment failed. Please try again later.");
      }
    }, 3000); // Simulate a 3-second payment process
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setPaymentMessage("");
    handlePayment(); // Retry payment process
  };

  return (
    <div className="payment-confirmation-container">
      <div className="payment-header">
        <h2>Payment Confirmation</h2>
        <p>Please review your payment details before confirming.</p>
      </div>

      <div className="payment-details">
        <h3>Payment Details</h3>
        <p><strong>Item:</strong> Laptop</p>
        <p><strong>Amount:</strong> $1200</p>
        <p><strong>Payment Method:</strong> Mpesa</p>
      </div>

      <div className="payment-status">
        {paymentStatus === null ? (
          <button className="confirm-payment-btn" onClick={handlePayment}>
            Confirm Payment
          </button>
        ) : (
          <>
            <div className={`status-message ${paymentStatus.toLowerCase()}`}>
              <h3>{paymentStatus}</h3>
              <p>{paymentMessage}</p>
            </div>
            {paymentStatus === "Failed" && (
              <button className="retry-payment-btn" onClick={handleRetry}>
                Retry Payment
              </button>
            )}
          </>
        )}
      </div>

      <div className="back-to-home">
        <button
          className="back-to-home-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
