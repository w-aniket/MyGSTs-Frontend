import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MySupportTickets.css";
import axios from "axios";

const MySupportTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/support/tickets/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching support tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="mst-loading">Loading support tickets...</div>;
  }

  if (tickets.length === 0) {
    return <div className="mst-empty">No support tickets found.</div>;
  }

  return (
    <div className="mst-page">
      <h1>My Support Tickets</h1>

      {tickets.map((ticket) => (
        <div key={ticket._id} className="mst-card">
          <div className="mst-info">
            <h3>{ticket.ticketId}</h3>

            <p>
              Service Request:{" "}
              <strong>{ticket.serviceRequestId?.displayId}</strong>
            </p>

            <span className={`mst-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </span>

            <p>
              <strong>Issue:</strong> {ticket.issueType}
            </p>

            <p className="mst-message">
              <strong>Message:</strong> {ticket.message}
            </p>
            {ticket.attachments?.length > 0 && (
              <div className="ticket-attachments">
                <strong>Attachments:</strong>
                <ul>
                  {ticket.attachments.map((file, index) => (
                    <li key={index}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📎 {file.originalName}
                      </a>
                      <span className="file-size">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mst-date">
              Created on {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            className="mst-btn"
            onClick={() =>
              navigate(`/my-service-requests/${ticket.serviceRequestId?._id}`)
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
