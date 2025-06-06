import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, icon, iconbg, features, serviceId }) => {
  const navigate = useNavigate()
  return (
    <div
      className="main-service-card"
      style={{ boxShadow: `2px 2px 1px 1px ${iconbg}80` }}
      onClick={() => navigate(`/services/${serviceId}`) }
    >
      <div className="main-service-header">
        <div className="icon-circle" style={{ backgroundColor: iconbg }}>
          <i className={icon} style={{ fontSize: "24px", color: "#fff" }}></i>
        </div>
        <a href="#">
          <span className="external-icon">🔗</span>
        </a>
      </div>
      <h3 className="main-service-title">{title}</h3>
      <ul className="main-service-features">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
