import React from "react";
import "../styles/inventory.css";  // Assuming you're using a separate CSS file for the modal

const Modal = ({ show, onClose, item, onConfirm }) => {
  if (!show || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Purchase</h2>
        <img
          src={item.image}
          alt={item.name}
          className="modal-item-img"
        />
        <p><strong>Item:</strong> {item.name}</p>
        <p><strong>CPU:</strong> {item.specs.cpu}</p>
        <p><strong>RAM:</strong> {item.specs.ram}</p>
        <p><strong>Storage:</strong> {item.specs.storage}</p>
        <p><strong>GPU:</strong> {item.specs.gpu}</p>
        <p><strong>Price:</strong> M {item.price}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onConfirm(item)}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
