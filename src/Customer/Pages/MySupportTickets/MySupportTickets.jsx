import React from "react";
import { useNavigate } from "react-router-dom";
import "./MySupportTickets.css";

const MySupportTickets = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      id: "SUP-1023",
      serviceRequestId: "SR-9001",
      status: "OPEN",
      createdAt: "02 Jan 2026",
    },
    {
      id: "SUP-1020",
      serviceRequestId: "SR-8890",
      status: "RESOLVED",
      createdAt: "28 Dec 2025",
    },
  ];

  return (
    <div className="mst-page">
      <h1>My Support Tickets</h1>

      {tickets.map((ticket) => (
        <div key={ticket.id} className="mst-card">
          <div>
            <h3>{ticket.id}</h3>
            <p>Service Request: {ticket.serviceRequestId}</p>
            <span className={`mst-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </span>
          </div>

          <button
            className="mst-btn"
            onClick={() =>
              navigate(`/my-service-requests/${ticket.serviceRequestId}`)
            }
          >
            View Request
          </button>
        </div>
      ))}
    </div>
  );
};

export default MySupportTickets;
