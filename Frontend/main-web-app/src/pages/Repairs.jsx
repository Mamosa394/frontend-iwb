import React, { useState } from "react";
import "../styles/repairs.css";
import Header from "../components/Header";

const Repairs = () => {
  const [repairList] = useState([
    {
      id: 1,
      name: "Laptop Screen Replacement",
      description: "Replacing damaged or cracked laptop screens.",
      price: 1200,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Desktop RAM Upgrade",
      description: "Upgrading RAM for faster performance.",
      price: 800,
      status: "Completed",
    },
    {
      id: 3,
      name: "Hard Drive Replacement",
      description: "Replacing failing or damaged hard drives.",
      price: 1000,
      status: "Pending",
    },
    {
      id: 4,
      name: "Laptop Battery Replacement",
      description: "Replacing laptop batteries for longer use.",
      price: 950,
      status: "Completed",
    },
  ]);

  return (
    <div className="repairs-container">
      <Header />
      <header className="repairs-header">
        <h1>Repair Services</h1>
        <p>Get your devices fixed with expert care and service.</p>
      </header>

      <div className="repair-list">
        {repairList.map((repair) => (
          <div key={repair.id} className="repair-item">
            <h3>{repair.name}</h3>
            <p>{repair.description}</p>
            <p><strong>Price:</strong> M {repair.price}</p>
            <p className={`status ${repair.status.toLowerCase()}`}>{repair.status}</p>
            <button className="request-button">Request Repair</button>
          </div>
        ))}
      </div>

      <footer className="repairs-footer">
        <p>&copy; 2025 IWB Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Repairs;
