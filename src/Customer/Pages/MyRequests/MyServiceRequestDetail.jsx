import React from "react";
import "./MyServiceRequestDetail.css";
import { formatDate, getShortId } from "../../../Utils/basicFunctions";

const dummyRequest = {
  _id: "693ebee5f9377868e90c30c8",
  service: { title: "GST Filing (Monthly)" },
  status: "In Progress",
  paymentStatus: "Paid",
  amount: 1500,
  createdAt: "2025-12-14T13:43:01.426Z",
  timeline: [
    { label: "Request Submitted", done: true },
    { label: "Payment Completed", done: true },
    { label: "Assigned to Accountant", done: true },
    { label: "In Progress", done: true },
    { label: "Completed", done: false },
  ],
  clientDocuments: [
    { name: "Sales_Report_Dec.pdf" },
    { name: "Purchase_Invoices.zip" },
  ],
  finalDocuments: [
    { name: "GST_Return_Filed.pdf" },
    { name: "Acknowledgement.pdf" },
  ],
};

const MyServiceRequestDetail = () => {
  return (
    <div className="vsr-page">
      {/* HEADER */}
      <div className="vsr-header">
        <h1>{dummyRequest.service.title}</h1>
        <p>Request ID: #{getShortId(dummyRequest._id)}</p>
        <div className="vsr-badges">
          <span className={`badge ${dummyRequest.status.toLowerCase()}`}>
            {dummyRequest.status}
          </span>
          <span className={`badge ${dummyRequest.paymentStatus.toLowerCase()}`}>
            {dummyRequest.paymentStatus}
          </span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="vsr-card">
        <h3>Summary</h3>
        <div className="vsr-grid">
          <div>
            <span>Submitted On</span>
            <strong>{formatDate(dummyRequest.createdAt)}</strong>
          </div>
          <div>
            <span>Amount</span>
            <strong>₹{dummyRequest.amount}</strong>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="vsr-card">
        <h3>Status Timeline</h3>
        <ul className="vsr-timeline">
          {dummyRequest.timeline.map((step, i) => (
            <li key={i} className={step.done ? "done" : ""}>
              {step.label}
            </li>
          ))}
        </ul>
      </div>

      {/* CLIENT DOCUMENTS */}
      <div className="vsr-card">
        <h3>Documents Uploaded by You</h3>
        <ul className="vsr-files">
          {dummyRequest.clientDocuments.map((doc, i) => (
            <li key={i}>{doc.name}</li>
          ))}
        </ul>
      </div>

      {/* FINAL WORK */}
      <div className="vsr-card highlight">
        <h3>Final Documents (By Accountant)</h3>
        {dummyRequest.finalDocuments.length === 0 ? (
          <p>No final documents uploaded yet.</p>
        ) : (
          <ul className="vsr-files">
            {dummyRequest.finalDocuments.map((doc, i) => (
              <li key={i}>{doc.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* PAYMENT */}
      <div className="vsr-card">
        <h3>Payment</h3>
        <p>
          <strong>Status:</strong> {dummyRequest.paymentStatus}
        </p>
        <p>
          <strong>Amount Paid:</strong> ₹{dummyRequest.amount}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="vsr-actions">
        <button className="outline">Cancel Request</button>
        <button className="primary">Contact Support</button>
      </div>
    </div>
  );
};

export default MyServiceRequestDetail;
