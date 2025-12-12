import React, { useState } from "react";
import AttachmentViewer from "../../Admin/Components/AttachmentViewer/AttachmentViewer";
import "./ServiceRequestInfo.css";
import { downloadInvoice } from "../../Utils/Invoice/downloadInvoice";

const ServiceRequestInfo = ({ request, role }) => {
  const paymentStatus = request.invoice ? "Paid" : "Pending";

  return (
    <div className="request-info">
      <h2 className="info-title">Request Information</h2>

      <div className="info-grid">
        <div className="info-row">
          <strong>Client:</strong> {request.name || "N/A"}
        </div>
        {/*show email and phone if backend return admin leader owner */}
        {request.email && (
          <div className="info-row">
            <strong>Email:</strong> {request.email}
          </div>
        )}
        {request.phone && (
          <div className="info-row">
            <strong>Phone:</strong> {request.phone}
          </div>
        )}
        <div className="info-row">
          <strong>Service:</strong>
          <span>{request.service?.title || "N/A"}</span>
        </div>
        <div className="info-row">
          <strong>Category:</strong>
          <span>{request.service?.category || "N/A"}</span>
        </div>
        <div className="info-row">
          <strong>Company:</strong>
          <span>{request.companyName || "N/A"}</span>
        </div>
        <div className="info-row">
          <strong>Status:</strong>{" "}
          <span
            className={`sr-status sr-status-${request.status
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {request.status}
          </span>
        </div>
        <div className="info-row">
          <strong>Payment Status:</strong>{" "}
          <span
            className={`payment-status payment-${request.invoice?.status?.toLowerCase()}`}
          >
            {request.invoice?.status}
          </span>
        </div>
        {request.invoice?.isPaid && (
          <div className="info-row">
            <strong>Invoice:</strong>
            <button onClick={ () => downloadInvoice(request.invoice._id)} className="invoice-btn">
              Download Invoice
            </button>
          </div>
        )}

        <div className="info-row">
          <strong>Created:</strong>{" "}
          <span>{new Date(request.createdAt).toLocaleString()}</span>
        </div>
        <div className="info-row description-row">
          <strong>Description:</strong>
          <p>{request.description || "-"}</p>
        </div>
        <div className="info-row attachments-row">
          {request.files?.length ? (
            <AttachmentViewer
              files={request.files || []}
              requestId={request._id}
            />
          ) : (
            <span>No attachments</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestInfo;
