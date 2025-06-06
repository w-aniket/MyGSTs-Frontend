import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/services/${id}`);
        setService(res.data);
      } catch (error) {
        console.error("Error in fetching service", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="service-detail-container">
        <p>Loading service details...</p>
      </div>
    );
  }

  if (!service) return <p>Service not found</p>;
  return (
    <div className="service-detail-container">
      <h1>{service.title}</h1>

      <div className="service-icon" style={{ background: service.iconbg }}>
        <i
          className={service.icon}
          style={{ fontSize: "24px", color: "#fff" }}
        ></i>
      </div>

      <p className="description">{service.description}</p>

      {Array.isArray(service.features) && service.features.length > 0 && (
        <>
          <h3>Features</h3>
          <ul className="features-list">
            {service.features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </>
      )}

      {service.pricing && (
        <>
          <h3>Pricing</h3>
          <p>{service.pricing}</p>
        </>
      )}

      {service.benefits?.length > 0 && (
        <>
          <h3>Benefits</h3>
          <ul className="benefits-list">
            {service.benefits.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </>
      )}

      <button
        className="request-btn"
        onClick={() => alert("we'll build this next!")}
      >
        Request This Service
      </button>
    </div>
  );
};

export default ServiceDetail;
