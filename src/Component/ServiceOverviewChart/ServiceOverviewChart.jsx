import React, { useEffect, useState } from 'react';
import "./ServiceOverviewChart.css";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useInView } from "react-intersection-observer";

const mockServicesData = [
  { name: "GST Filing", value: 25 },
  { name: "ITR Filing", value: 18 },
  { name: "Accounting", value: 12 },
  { name: "Payroll", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ServiceOverviewChart = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [animate, setAnimate] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    // Replace with API call later
    setData(mockServicesData);
  }, []);

  useEffect(() => {
    if (inView) {
      setAnimate(true);

      // Sequentially show slices
      let index = 0;
      const interval = setInterval(() => {
        if (index < data.length) {
          setDisplayData(prev => [...prev, data[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 300); // 300ms delay per slice
    }
  }, [inView, data]);

  return (
    <div ref={ref} style={{ width: "100%", height: 300, marginTop: 20 }}>
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
            fill="#8884d8"
            label
            isAnimationActive={animate}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceOverviewChart;
