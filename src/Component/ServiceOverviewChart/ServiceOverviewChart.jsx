import React, { useEffect, useState } from "react";
import "./ServiceOverviewChart.css";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const BEAUTIFUL_COLORS_20 = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28BFE", "#FF6F91", "#FF9F40", "#2ECC71",
  "#FF6B6B", "#6C5B7B", "#FFC300", "#FF5733",
  "#C70039", "#900C3F", "#581845", "#1ABC9C",
  "#3498DB", "#9B59B6", "#E74C3C", "#F39C12"
];

const generateColors = (num) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    colors.push(BEAUTIFUL_COLORS_20[i % BEAUTIFUL_COLORS_20.length]);
  }
  return colors;
};


const ServiceOverviewChart = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [colors, setColors] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `${apiUrl}/api/service-requests/overview`,
          config
        );
        setData(response.data);
        setColors(generateColors(response.data.length));
      } catch (err) {
        console.error(err);
        setError("Failed to load services data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sequential animation for slices
  useEffect(() => {
    if (inView && data.length > 0) {
      setAnimate(true);
      setDisplayData([]);
      let index = 0;

      const interval = setInterval(() => {
        if (index < data.length) {
          setDisplayData((prev) => [...prev, data[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval); // cleanup on unmount
    }
  }, [inView, data]);

  if (loading) return <p>Loading services overview...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (data.length === 0) return <p>No services found with invoices.</p>;

  return (
    <div className="service-overview" ref={ref} style={{ width: "100%", height: 350, marginTop: 20 }}>
      <h4>Services Overview</h4>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            isAnimationActive={animate}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceOverviewChart;
