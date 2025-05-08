import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
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

const NetIncomePage = () => {
  const grossProfit = incomeData.revenue - incomeData.costOfGoodsSold;
  const netIncome = grossProfit - incomeData.operatingExpenses - incomeData.taxes;
  const totalAdditionalExpenses = incomeData.additionalCategories.reduce(
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
          incomeData.revenue,
          incomeData.costOfGoodsSold,
          incomeData.operatingExpenses,
          incomeData.taxes,
        ],
        backgroundColor: ["#34d399", "#6ee7b7", "#ff4d4d", "#e02424"],
        borderColor: ["#34d399", "#6ee7b7", "#ff4d4d", "#e02424"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="income-statement-page" style={{ display: "flex" }}>
      {/* Sidebar */}
      <div className="admin-sidebar" style={styles.sidebar}>
        <div className="sidebar-header" style={styles.header}>
          <h2 style={styles.title}>Admin Panel</h2>
        </div>
        <div className="sidebar-menu" style={styles.menu}>
          <ul style={styles.menuList}>
            <li>
              <Link to="/home-page" style={styles.link}>
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/inventory" style={styles.link}>
                Inventory
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="income-statement-container" style={{ marginLeft: "250px", padding: "20px" }}>
        <h1 className="income-statement-title">Projected Monthly Income Statement</h1>

        {/* Net Income Section */}
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

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#1e1e2f', // Dark background
    padding: '20px',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    color: '#FBBA3F', // Gold color
    fontSize: '24px',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
  },
  menuList: {
    marginTop: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#FBBA3F', // Gold color
    fontSize: '18px',
    display: 'block',
    padding: '10px 0',
    listStyleType: 'none',
  },
};

export default NetIncomePage;
