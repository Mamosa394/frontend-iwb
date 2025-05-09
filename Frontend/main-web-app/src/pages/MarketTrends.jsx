import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../styles/MarketTrends.css";
import InvestorHeader from "./InvestorHeader";
const data = [
  { name: "Jan", market: 1200 },
  { name: "Feb", market: 1400 },
  { name: "Mar", market: 1000 },
  { name: "Apr", market: 1800 },
  { name: "May", market: 1600 },
  { name: "Jun", market: 2100 },
];

const MarketTrends = () => {
  return (
    <div className="market-trends-container">
      <InvestorHeader />
      <h1 className="market-title">Market Trends Overview</h1>

      <div className="market-section">
        <h2 className="section-title">Global Investment Movement</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="market"
                stroke="#fbba3f"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="market-section">
        <h2 className="section-title">Monthly Growth Comparison</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="market"
                stroke="#ffd873"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;
