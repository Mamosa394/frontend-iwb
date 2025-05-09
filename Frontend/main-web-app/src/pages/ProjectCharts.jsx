import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/PageLayout.css";
import InvestorHeader from "./InvestorHeader";

const data = [
  { date: "Mon", value: 400 },
  { date: "Tue", value: 600 },
  { date: "Wed", value: 800 },
  { date: "Thu", value: 700 },
  { date: "Fri", value: 900 },
];

const ProjectCharts = () => (
  <div>
    <InvestorHeader />
    <h2>Project Financial Overview</h2>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#fbba3f"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ProjectCharts;
