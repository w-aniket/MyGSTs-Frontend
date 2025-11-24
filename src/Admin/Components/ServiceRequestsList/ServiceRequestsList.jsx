import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ServiceRequestList.css";

export default function ServiceRequestList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/service-requests`, authHeader);
      setRequests(res.data?.requests);
    } catch (error) {
      console.error("Error loading requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) return <p className="sr-loading">Loading...</p>;

  return (
    <div className="sr-container">
      <h2 className="sr-title">Service Requests</h2>

      <table className="sr-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Email</th>
            <th>Service</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6" className="sr-empty">No service requests found</td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id}>
                <td>{req.name || "N/A"}</td>
                <td>{req.email || "N/A"}</td>
                <td>{req.service?.title || "N/A"}</td>
                <td>
                  <span className={`sr-status sr-status-${req.status?.toLowerCase().replace(/\s+/g, "-")}`}>{req.status}</span>
                </td>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/admin/service-request/${req._id}`} className="sr-action-btn">
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
