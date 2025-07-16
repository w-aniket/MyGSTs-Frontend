import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContex/UserContext";
import "./MyRequests.css";
import AttachmentViewer from "../../../Admin/Components/AttachmentViewer/AttachmentViewer";

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

  console.log("Requests:", requests);

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

              {req.files && req.files.length > 0 && (
                <div className="request-files">
                  <AttachmentViewer
                    files={
                  req.files?.length > 0
                    ? req.files
                    : req.file
                    ? [req.file]
                    : []
                }
                requestId={req._id}
                  />
                </div>
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
