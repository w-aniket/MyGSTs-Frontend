import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SupportTicket.css";
import { toast } from "react-toastify";

const SupportTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const serviceRequestId = location.state?.id;

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

    // API call placeholder
    console.log({
      serviceRequestId,
      issueType,
      message,
      files,
    });

    setLoading(false);
    toast.success("Support request submitted successfully!");
    navigate(`/my-service-requests/${serviceRequestId}`, {
        state: {supportSubmitted: true},
    });
    setTimeout(() => {
    }, 1000);
  };
  return (
    <div className="support-ticket">
      <h1>Rise Ticket</h1>

      {/* Request Context */}
      <div className="support-card">
        <h3>Service Request Details</h3>
        <p>
          Reference ID: <strong>{serviceRequestId}</strong>
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
