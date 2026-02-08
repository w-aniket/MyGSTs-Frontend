import React from "react";
import { Link } from "react-router-dom";
import './ServiceCard.css'

const ServiceCard = ({ title, icon, iconbg, features, serviceId }) => {
  return (
    <article
      className="main-service-card"
      style={{ boxShadow: `2px 2px 1px 1px ${iconbg}80` }}
    >
      {/* Header */}
      <div className="main-service-header">
        <div
          className="icon-circle"
          style={{ backgroundColor: iconbg }}
          aria-hidden="true"
        >
          <i
            className={icon}
            style={{ fontSize: "24px", color: "#fff" }}
            aria-hidden="true"
          ></i>
        </div>

        {/* SEO-friendly link */}
        <Link
          to={`/services/${serviceId}`}
          className="external-icon"
          aria-label={`View details about ${title}`}
        >
          🔗
        </Link>
      </div>

      {/* Service Title */}
      <h3 className="main-service-title">
        <Link
          to={`/services/${serviceId}`}
          className="service-title-link"
        >
          {title}
        </Link>
      </h3>

      {/* Features */}
      <ul className="main-service-features">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>

      {/* Invisible full-card link for UX */}
      <Link
        to={`/services/${serviceId}`}
        className="card-overlay-link"
        aria-label={`Read more about ${title}`}
      />
    </article>
  );
};

export default ServiceCard;
