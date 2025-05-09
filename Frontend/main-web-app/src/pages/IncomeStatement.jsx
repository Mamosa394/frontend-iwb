import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import "../styles/incomeStatement.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AdminSidebar from "../components/AdminSidebar";

// Initialize Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement, // Register PieElement as ArcElement for Pie chart
  Title,
  Tooltip,
  Legend
);

// Hardcoded data (No backend involved)
const incomeData = {
  revenue: 3000000, // 3 million Maloti
  costOfGoodsSold: 800000, // Example Cost of Goods Sold
  operatingExpenses: 500000, // Example Operating Expenses
  taxes: 200000, // Example Taxes
  additionalCategories: [
    { label: "Miscellaneous", amount: 100000 }, // Example Additional Category
  ],
};

const IncomeStatement = () => {
  const [month, setMonth] = useState("April 2025");
  const [data, setData] = useState(incomeData);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: Number(value) || 0 });
  };

  const handleCategoryChange = (index, key, value) => {
    const updatedCategories = [...data.additionalCategories];
    updatedCategories[index][key] = value;
    setData({ ...data, additionalCategories: updatedCategories });
  };

  const addCategory = () => {
    setData({
      ...data,
      additionalCategories: [
        ...data.additionalCategories,
        { label: "", amount: 0 },
      ],
    });
  };

  const removeCategory = (index) => {
    const updatedCategories = data.additionalCategories.filter(
      (_, i) => i !== index
    );
    setData({ ...data, additionalCategories: updatedCategories });
  };

  const grossProfit = data.revenue - data.costOfGoodsSold;
  const netIncome = grossProfit - data.operatingExpenses - data.taxes;
  const totalAdditionalExpenses = data.additionalCategories.reduce(
    (sum, category) => sum + Number(category.amount),
    0
  );
  const finalNetIncome = netIncome - totalAdditionalExpenses;

  const months = [
    "January 2025",
    "February 2025",
    "March 2025",
    "April 2025",
    "May 2025",
    "June 2025",
    "July 2025",
    "August 2025",
    "September 2025",
    "October 2025",
    "November 2025",
    "December 2025",
  ];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Net Income",
        data: months.map(() => Math.floor(Math.random() * 5000) - 2500), // Random data for visualization
        backgroundColor: "#6ee7b7", // Green
        borderColor: "#34d399",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: months.map(() => Math.floor(Math.random() * 1000)), // Random expenses for visualization
        backgroundColor: "#ff4d4d", // Red
        borderColor: "#e02424",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Revenue", "Cost of Goods Sold", "Expenses", "Taxes"],
    datasets: [
      {
        data: [
          data.revenue,
          data.costOfGoodsSold,
          data.operatingExpenses,
          data.taxes,
        ],
        backgroundColor: ["#34d399", "#6ee7b7", "#ff4d4d", "#e02424"],
        borderColor: ["#34d399", "#6ee7b7", "#ff4d4d", "#e02424"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="income-statement-page" style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="income-statement-container">
        <h1 className="income-statement-title">
          Projected Monthly Income Statement
        </h1>

        {/* Main Section: Income Statement */}
        <div className="main-section">
          {/* Income Statement Section */}
          <div className="income-input-container">
            {/* Editable Rows */}
            <div className="income-statement-item">
              <span className="income-label">Revenue</span>
              <input
                type="number"
                value={data.revenue}
                onChange={(e) => handleChange("revenue", e.target.value)}
                className="income-statement-input"
              />
            </div>
            <div className="income-statement-item">
              <span className="income-label">Cost of Goods Sold</span>
              <input
                type="number"
                value={data.costOfGoodsSold}
                onChange={(e) =>
                  handleChange("costOfGoodsSold", e.target.value)
                }
                className="income-statement-input"
              />
            </div>
            <div className="income-statement-item">
              <span className="income-label">Operating Expenses</span>
              <input
                type="number"
                value={data.operatingExpenses}
                onChange={(e) =>
                  handleChange("operatingExpenses", e.target.value)
                }
                className="income-statement-input"
              />
            </div>
            <div className="income-statement-item">
              <span className="income-label">Taxes</span>
              <input
                type="number"
                value={data.taxes}
                onChange={(e) => handleChange("taxes", e.target.value)}
                className="income-statement-input"
              />
            </div>

            {/* Additional Categories */}
            {data.additionalCategories.map((category, index) => (
              <div key={index} className="income-statement-category">
                <input
                  type="text"
                  value={category.label}
                  onChange={(e) =>
                    handleCategoryChange(index, "label", e.target.value)
                  }
                  placeholder="Category Name"
                  className="category-input"
                />
                <input
                  type="number"
                  value={category.amount}
                  onChange={(e) =>
                    handleCategoryChange(index, "amount", e.target.value)
                  }
                  placeholder="Amount"
                  className="category-input"
                />
                <button
                  onClick={() => removeCategory(index)}
                  className="remove-category-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addCategory} className="add-category-btn">
              Add Category
            </button>
          </div>
        </div>

        {/* Net Income and Chart Section */}
        <div className="chart-section">
          <p className="net-income">
            Net Income: M {finalNetIncome.toFixed(2)}
          </p>
          <div className="chart-container">
            <div className="chart-item">
              <Chart type="bar" data={chartData} />
            </div>
            <div className="chart-item">
              <Chart type="pie" data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatement;
