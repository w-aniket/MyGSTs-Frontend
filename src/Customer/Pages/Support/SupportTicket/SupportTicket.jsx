import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SupportTicket.css";
import { toast } from "react-toastify";
import axios from "axios";

const SupportTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } }; 

  const {requestId, displayId} = location.state || {};

  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issueType || !message) {
      toast.error("Please select an issue type and describe your issue.");
      return;
    }

    setLoading(true);

    // API call to submit support ticket
    try {
      const formData = new FormData();
      formData.append("issueType", issueType);
        formData.append("message", message);
        formData.append("serviceRequestId", requestId);

        files.forEach((file, index) => {
            formData.append(`files`, file);
        });
        const response = await axios.post(
            `${apiUrl}/api/support/tickets`,
            formData,
            authHeader
        );
        toast.success("Support request submitted successfully!");
        navigate(`/my-service-requests/${displayId}`, {
            state: {supportSubmitted: true},
        });
    } catch (error) {
        console.error("Error submitting support ticket:", error);
        toast.error("Failed to submit support request. Please try again.");
    } finally {
        setLoading(false);
    }

  };
  return (
    <div className="support-ticket">
      <h1>Rise a Support Ticket</h1>

      {/* Request Context */}
      <div className="support-card">
        <h3>Service Request Details</h3>
        <p>
          Reference ID: <strong>{displayId}</strong>
        </p>
      </div>

      {/* Support Form */}
      <form className="support-form" onSubmit={handleSubmit}>
        <label>
          Issue Type
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
          >
            <option value="">Select an issue</option>
            <option value="PAYMENT">Payment Issue</option>
            <option value="DOCUMENT">Document Upload Issue</option>
            <option value="STATUS">Status Delay</option>
            <option value="INFO">Wrong Information</option>
            <option value="OTHER">Other</option>
          </select>
        </label>

        <label>
          Describe Your Issue
          <textarea
            placeholder="Explain your issue clearly so our team can help you faster."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <label>
          Attach Files (optional)
          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
          />
        </label>

        <button className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Support Request"}
        </button>
      </form>
    </div>
  );
};

export default SupportTicket;
