import React from "react";
import AttachmentViewer from "../../Admin/Components/AttachmentViewer/AttachmentViewer";
import "./ServiceRequestInfo.css";

const ServiceRequestInfo = ({ request, role }) => {
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
          <strong>Status:</strong> {request.status}
        </div>
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
