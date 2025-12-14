import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaMoneyBillWave, FaClock } from "react-icons/fa";
import "./ServiceRequestConfirmation.css";
import { handlePayNow } from "../../../Utils/Payment/payments";

const ServiceRequestConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const serviceName = state?.serviceName || "Service";
  const amount = state?.amount || 0;

  const handlePay = (id, amount) => {
    handlePayNow(navigate, id, Number(amount));
  }

  return (
    <div className="src-page">
      <div className="src-card">
        <FaCheckCircle className="src-success-icon" />

        <h1>Request Submitted Successfully</h1>
        <p className="src-subtext">
          Your service request has been received. Our team will review it and
          contact you within a few hours.
        </p>

        <div className="src-details">
          <div className="src-row">
            <span>Service</span>
            <strong>{serviceName}</strong>
          </div>
          <div className="src-row">
            <span>Request ID</span>
            <strong>{id}</strong>
          </div>
          <div className="src-row">
            <span>Amount</span>
            <strong>₹{amount}</strong>
          </div>
          <div className="src-row">
            <span>Status</span>
            <strong className="pending">Payment Pending</strong>
          </div>
        </div>

        <div className="src-actions">
          <button className="btn primary"  onClick={() => handlePay(id, amount)}>
            <FaMoneyBillWave /> Pay Now
          </button>
          <button
            className="btn outline"
            onClick={() => navigate("/my-service-requests")}
          >
            <FaClock /> Pay Later
          </button>
        </div>

        <div className="src-footer">
          <button
            className="link-btn"
            onClick={() => navigate("/my-service-requests")}
          >
            Go to My Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestConfirmation;