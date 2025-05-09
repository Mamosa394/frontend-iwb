import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/ForexCharts.css";
import InvestorHeader from "./InvestorHeader";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const InvestorPerformanceChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "ROI (%)",
        data: [5, 8, 7, 10, 12],
        borderColor: "#fbba3f",
        backgroundColor: "rgba(251, 186, 63, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Risk Score",
        data: [3, 4, 2.5, 3.2, 2.8],
        borderColor: "#ff6b6b",
        backgroundColor: "rgba(255, 107, 107, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Asset Growth (k)",
        data: [100, 110, 130, 140, 160],
        borderColor: "#cedbe9",
        backgroundColor: "rgba(206, 219, 233, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div>
      <InvestorHeader />
      <div className="investor-chart-wrapper">
        <h3 className="investor-chart-title">Investment Evaluation Overview</h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default InvestorPerformanceChart;
