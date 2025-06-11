import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContex/UserContext";
import "./MyRequests.css"

const MyServiceRequests = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/service-requests/my`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRequests(res.data.requests);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  if (loading) {
    return <p className="message loading">Loading your service requests...</p>;
  }

  return (
    <div className="request-container">
      <h2 className="request-heading">My service Requests</h2>
      {requests.length === 0 ? (
        <p className="message">
          You have not submitted any service requests yet.
        </p>
      ) : (
        <div className="request-grid">
          {requests.map((req) => (
            <div key={req._id} className="request-card">
              <h3 className="request-title">{req.service?.title}</h3>
              <p className="request-category">
                Category: {req.service.category || "N/A"}
              </p>
              <p
                className={`request-status status-${req.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                Status: {req.status}
              </p>
              <p className="request-date">
                Submitted on: {new Date(req.createdAt).toLocaleString()}
              </p>
              {req.file && (
                <p className="request-file">
                  <a href={req.file} target="_blank" rel="noopner noreferrer">
                    {" "}
                    View uploaded file
                  </a>
                </p>
              )}
              <p className="request-description">
                <strong>Description: </strong> {req.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServiceRequests;
