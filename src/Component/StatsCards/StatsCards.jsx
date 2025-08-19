import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";
import "./StatsCards.css";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const StatsCards = () => {
  const [stats, setStats] = useState([]);

  // Mock API fetch
  useEffect(() => {
    // Replace this with actual API call later
    const fetchStats = async () => {
      const data = [
        {
          id: 1,
          title: "Total Clients",
          value: 120,
          icon: <FaUsers />,
          color: "#4CAF50",
          weeklyTrend: [10, 15, 12, 20, 18, 22, 25],
        },
        {
          id: 2,
          title: "Invoices",
          value: 8250,
          icon: <FaFileInvoiceDollar />,
          color: "#2196F3",
          weeklyTrend: [1000, 1200, 900, 1300, 1100, 1400, 1250],
        },
        {
          id: 3,
          title: "GST Filings",
          value: 25,
          icon: <FaClipboardList />,
          color: "#FF9800",
          weeklyTrend: [3, 4, 2, 5, 4, 3, 5],
        },
        {
          id: 4,
          title: "ITR Filings",
          value: 18,
          icon: <FaFileAlt />,
          color: "#9C27B0",
          weeklyTrend: [2, 1, 3, 2, 2, 1, 3],
        },
      ];
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="stats-cards">
      {stats.map((stat) => (
        <div
          className="stat-card"
          key={stat.id}
          style={{ borderTop: `4px solid ${stat.color}` }}
        >
          <div className="stat-data">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h4>{stat.title}</h4>
              <p>
                {stat.title === "Invoices" ? "$" : ""}
                <CountUp end={stat.value} duration={2.5} separator="," />
              </p>
            </div>
          </div>

        <ResponsiveContainer width="100%" height={40}>


          <LineChart
            width={100}
            height={40}
            data={stat.weeklyTrend.map((v, i) => ({ day: i + 1, value: v }))}
            >
            <Line
              type="monotone"
              dataKey="value"
              stroke={stat.color}
              strokeWidth={2}
              dot={false}
              />
          </LineChart>
              </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
