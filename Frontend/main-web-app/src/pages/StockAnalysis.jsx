import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../styles/StockAnalysis.css";
import InvestorHeader from "./InvestorHeader";

const stockData = [
  { date: "Jan", price: 140 },
  { date: "Feb", price: 150 },
  { date: "Mar", price: 135 },
  { date: "Apr", price: 170 },
  { date: "May", price: 160 },
  { date: "Jun", price: 180 },
];

const revenueData = [
  { month: "Q1", revenue: 120000, expenses: 70000 },
  { month: "Q2", revenue: 150000, expenses: 90000 },
  { month: "Q3", revenue: 170000, expenses: 85000 },
  { month: "Q4", revenue: 190000, expenses: 100000 },
];

const pieData = [
  { name: "Product Sales", value: 60 },
  { name: "Investments", value: 25 },
  { name: "Partnerships", value: 15 },
];

const COLORS = ["#fbba3f", "#ffd873", "#3a3a4d"];

const StockAnalysis = () => {
  return (
    <div className="stock-analysis-container">
      <InvestorHeader />
      <h2 className="stock-title">📈 Stock Analysis - IWB Technologies</h2>

      <section className="stock-section">
        <h3 className="section-title">Stock Price Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#fbba3f"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="stock-section">
        <h3 className="section-title">Quarterly Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#fbba3f" />
            <Bar dataKey="expenses" fill="#3a3a4d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="stock-section">
        <h3 className="section-title">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default StockAnalysis;
