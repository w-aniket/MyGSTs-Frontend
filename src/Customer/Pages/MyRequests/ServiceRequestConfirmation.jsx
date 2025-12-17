import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaMoneyBillWave, FaClock } from "react-icons/fa";
import "./ServiceRequestConfirmation.css";
import { handlePayNow } from "../../../Utils/Payment/payments";
import { getShortId, gstAmount } from "../../../Utils/basicFunctions";

const ServiceRequestConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const serviceName = state?.serviceName || "Service";
  const amount = Number(state?.amount) || 0;

  const requestId = getShortId(id)
  const returnAmount = gstAmount(amount)

  const handlePay = (id, amount) => {
    handlePayNow(navigate, id, amount);
  };

  return (
    <div className="src-page">
      <div className="src-card">
        <div className="src-icon-wrapper">
          <FaCheckCircle className="src-success-icon" />
        </div>

        <h1>Request Submitted</h1>
        <p className="src-subtext">
          Our team will review it and contact you.
        </p>

        <div className="src-details">
          <div className="src-row">
            <span>Service</span>
            <strong>{serviceName}</strong>
          </div>
          <div className="src-row">
            <span>Request ID</span>
            <strong>{requestId}</strong>
          </div>
          <div className="src-divider" />
            <div className="src-row">
              <span>Base Amount</span>
              <strong>₹ {returnAmount.baseAmount}</strong>
            </div>
            <div className="src-row">
              <span>SGST (9%)</span>
              <strong>₹ {returnAmount.sgst}</strong>
            </div>
            <div className="src-row">
              <span>CGST (9%)</span>
              <strong>₹ {returnAmount.cgst}</strong>
            </div>

          <div className="src-divider" />

          <div className="src-row total">
              <span>Total Amount</span>
              <strong>₹ {amount}</strong>
            </div>
          
          <div className="src-row ">
            <span>Status</span>
            <strong className="pending">Payment Pending</strong>
          </div>
        </div>

        <div className="src-actions">
          <button className="btn primary" onClick={() => handlePay(id, amount)}>
            <FaMoneyBillWave /> Pay Now
          </button>
          <button
            className="btn outline"
            onClick={() => navigate(`/my-service-requests/${id}`)}
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
