import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminSupport.css";

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/api/support/admin/tickets`,
          authHeader
        );
        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching support tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      setUpdatingId(ticketId);

      await axios.patch(
        `${apiUrl}/api/support/admin/tickets/${ticketId}`,
        { status: newStatus },
        authHeader
      );

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-support">
      <h1>Support Tickets</h1>

      {tickets.length === 0 ? (
        <p className="empty-text">No support tickets available.</p>
      ) : (
        tickets.map((ticket) => (
          <div className="admin-ticket" key={ticket._id}>
            <div className="ticket-details">
              <h3>{ticket.ticketId}</h3>

              <p>
                <strong>User:</strong> {ticket.userId?.firstName}{" "}
                {ticket.userId?.lastName}
              </p>

              <p>
                <strong>Service Request:</strong>{" "}
                {ticket.serviceRequestId?.displayId}
              </p>

              <p>
                <strong>Service:</strong>{" "}
                {ticket.serviceRequestId?.service?.title}
              </p>

              <p>
                <strong>Request Status:</strong>{" "}
                {ticket.serviceRequestId?.status}
              </p>

              <p>
                <strong>Issue Type:</strong> {ticket.issueType}
              </p>

              <p className="ticket-message">
                <strong>Message:</strong> {ticket.message}
              </p>
            </div>

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

            <div className="ticket-actions">
              <select
                value={ticket.status}
                disabled={updatingId === ticket._id}
                onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                className={`status-select ${ticket.status.toLowerCase()}`}
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminSupport;
