import React from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import "../styles/net-income.css";
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
import InvestorHeader from "./InvestorHeader";

// Initialize Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Hardcoded data (No backend involved)
const incomeData = {
  revenue: 3000000,
  costOfGoodsSold: 800000,
  operatingExpenses: 500000,
  taxes: 200000,
  additionalCategories: [{ label: "Miscellaneous", amount: 100000 }],
};

const NetIncomePage = () => {
  const grossProfit = incomeData.revenue - incomeData.costOfGoodsSold;
  const netIncome =
    grossProfit - incomeData.operatingExpenses - incomeData.taxes;
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
        data: months.map(() => Math.floor(Math.random() * 5000) - 2500),
        backgroundColor: "#6ee7b7",
        borderColor: "#34d399",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: months.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "#ff4d4d",
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
    <div className="investment-net-income-page">
      <InvestorHeader />
      {/* Main Content */}
      <div className="investment-net-income-container">
        <h1 className="investment-net-income-title">
          Projected Income Statement for Investors
        </h1>

        {/* Financial Overview Section */}
        <div className="investment-financial-overview">
          <h2 className="investment-section-title">
            Company Financial Overview
          </h2>
          <p className="investment-financial-summary">
            Our company has achieved strong revenue growth in recent quarters,
            driven by increasing demand for our products and services. Our
            financial health remains solid, with a healthy gross profit margin,
            despite challenges in operating expenses and taxes.
          </p>
        </div>

        {/* Net Income Section */}
        <div className="investment-chart-section">
          <p className="investment-net-income">
            Net Income: M {finalNetIncome.toFixed(2)}
          </p>
          <div className="investment-chart-container">
            {/* Bar chart (Net Income) */}
            <div className="investment-chart-item">
              <Chart type="bar" data={chartData} />
            </div>

            {/* Pie chart (Revenue, COGS, Expenses, Taxes) */}
            <div className="investment-chart-item">
              <Chart type="pie" data={pieChartData} />
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="investment-key-metrics">
          <h2 className="investment-section-title">Key Financial Metrics</h2>
          <ul className="investment-metrics-list">
            <li className="investment-metrics-item">
              <strong>Revenue Growth:</strong> 15% year-over-year
            </li>
            <li className="investment-metrics-item">
              <strong>Gross Profit Margin:</strong> 73%
            </li>
            <li className="investment-metrics-item">
              <strong>Operating Expenses to Revenue Ratio:</strong> 16.7%
            </li>
            <li className="investment-metrics-item">
              <strong>Return on Investment (ROI):</strong> 22%
            </li>
          </ul>
        </div>

        {/* Future Projections Section */}
        <div className="investment-projections">
          <h2 className="investment-section-title">Future Projections</h2>
          <p className="investment-projection-summary">
            We project steady revenue growth over the next five years, driven by
            new market expansion and strategic partnerships. Expenses are
            expected to be managed efficiently, with a target of improving net
            income margins.
          </p>
        </div>

        {/* Links to Home and Logout */}
        <div className="investment-links">
          <Link to="/home-page" className="investment-link">
            Go to Home Page
          </Link>
          <Link to="/logout" className="investment-link">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NetIncomePage;
