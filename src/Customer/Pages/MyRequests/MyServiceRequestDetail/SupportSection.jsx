import React from "react";
import { useNavigate } from "react-router-dom";

const SupportSection = ({ displayId, requestId, supportTicket }) => {
  const navigate = useNavigate();

const isTicketOpen =
  !!supportTicket && supportTicket.status !== "RESOLVED";

  return (
    <div className="srd-section">
      <h2 className="srd-section-title">Need Help?</h2>

      <div className="srd-card srd-support-card">
        <div className="srd-support-left">
          <p className="srd-support-text">
            If you have any questions or issues related to this service request,
            our support team is here to help you.
          </p>
          <span className="srd-support-ref">
            Reference ID: <strong>{displayId}</strong>
          </span>

          {supportTicket && (
            <div
              className={`srd-ticket-status ${supportTicket.status.toLowerCase()}`}
            >
              Ticket Status: {supportTicket.status}
            </div>
          )}
        </div>

        <div className="srd-support-actions">
          {!isTicketOpen ? (
            <button
              className="srd-btn srd-btn-outline"
              onClick={() => navigate("/support", { state: { displayId, requestId } })}
            >
              Contact Support
            </button>
          ) : (
            <button className="srd-btn srd-btn-disabled" disabled>
              Ticket Already Open
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
