import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";
import "./StatsCards.css";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const StatsCards = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(`${apiUrl}/api/dashboard/stats`, config);
        const data = res.data;

        const cardsData = [
          {
            id: 1,
            title: "Total Clients",
            value: data.totalClients || 0,
            icon: <FaUsers />,
            color: "#4CAF50",
            weeklyTrend: data.weeklyTrends?.clients || [],
          },
          {
            id: 2,
            title: "Invoices",
            value: data.totalInvoiceAmount || 0,
            icon: <FaFileInvoiceDollar />,
            color: "#2196F3",
            weeklyTrend: data.weeklyTrends?.invoices || [],
          },
          {
            id: 3,
            title: "Pending Requests",
            value: data.pendingRequests || 0,
            icon: <FaClipboardList />,
            color: "#FF9800",
            weeklyTrend: data.weeklyTrends?.requests || [],
          },
          {
            id: 4,
            title: "Pending Payments",
            value: data.pendingPayments || 0,
            icon: <FaMoneyBillWave />,
            color: "#9C27B0",
            weeklyTrend: data.weeklyTrends?.payments || [],
          },
        ];

        setStats(cardsData);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
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
                {stat.title === "Invoices" ? "₹ " : ""}
                <CountUp end={stat.value} duration={2.5} separator="," />
              </p>
            </div>
          </div>

          {stat.weeklyTrend?.length > 0 && (
            <ResponsiveContainer width="100%" height={40}>
              <LineChart
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
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
