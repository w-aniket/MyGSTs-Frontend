import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRequestDetails } from "../../../Utils/APIs/serviceRequestApi";
import { formatDate, getShortId } from "../../../Utils/basicFunctions";
import { handlePayNow } from "../../../Utils/Payment/payments";
import { downloadInvoice } from "../../../Utils/Invoice/downloadInvoice";
import "./MyServiceRequestDetail.css";

const MyServiceRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [request, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRequestDetails = async () => {
    try {
      const res = await fetchRequestDetails(id);
      setRequests(res.data.request);
    } catch (error) {
      console.error("Failed to fetch request details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequestDetails();
  }, [id]);

  const canCancel =
    request?.status !== "Done" && request?.status !== "Cancelled";

  if (loading) {
    return <p className="message loading">Loading request detail...</p>;
  }

  if (loading) {
    return <p className="message error">Request not found</p>;
  }

  return (
    <div className="srd-page">
      {/* Header */}
      <div className="srd-header">
        <div>
          <h1>{request.service?.title}</h1>
          <p className="srd-sub">
            Reqeist ID: <strong>{getShortId(request._id)}</strong>
          </p>
        </div>

        <span className={`badge ${request.paymentStatus.toLowerCase()}`}>
          {request.paymentStatus}
        </span>
      </div>

{/* 2. Action Bar */}
<div className="srd-action-bar">
  <div className="srd-action-left">
    <span className={`srd-status-pill ${request.status?.toLowerCase()}`}>
      {request.status}
    </span>
  </div>

  <div className="srd-action-right">
    {request.paymentStatus === "Pending" && (
      <button
        className="srd-btn srd-btn-primary"
        onClick={() =>
          handlePayNow(
            null,
            request._id,
            Number(request.amount),
            getRequestDetails
          )
        }
      >
        Pay Now
      </button>
    )}

    {request.paymentStatus === "Paid" && (
      <button
        className="srd-btn srd-btn-secondary"
        onClick={() => downloadInvoice(request.invoice?._id)}
      >
        Download Invoice
      </button>
    )}

    {/* Cancel will be wired in step 7 */}
  </div>
</div>


      {/* Request Information */}
      <div className="srd-section">
        <h2 className="srd-section-title">Request Information</h2>

        <div className="srd-card">
          <div className="srd-info-grid">
            <div className="srd-info-item">
              <span>Request ID</span>
              <strong>{getShortId(request._id)}</strong>
            </div>

            <div className="srd-info-item">
              <span>Service</span>
              <strong>{request.service?.title}</strong>
            </div>

            <div className="srd-info-item">
              <span>Amount</span>
              <strong>₹{request.amount}</strong>
            </div>

            <div className="srd-info-item">
              <span>Payment Status</span>
              <strong>{request.paymentStatus}</strong>
            </div>

            <div className="srd-info-item">
              <span>Request Status</span>
              <strong>{request.status}</strong>
            </div>

            <div className="srd-info-item">
              <span>Submitted On</span>
              <strong>{formatDate(request.createdAt)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Client upload */}

      <div className="srd-section">
        <h2 className="srd-section-title">Client Uploaded Detail</h2>

        <div className="srd-card">
          {request.files && request.files.length > 0 ? (
            <div className="srd-file-list">
              {request.files.map((file) => (
                <div className="srd-file-item" key={file._id}>
                  <div className="srd-file-info">
                    <span className="srd-file-name">{file.documentName}</span>
                    <span className="srd-file-type">
                      {file.mimeType.toUpperCase()}
                    </span>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="srd-file-action"
                  >
                    View / Download
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="srd-empty-text">No documents uploaded.</p>
          )}
        </div>
      </div>

      {/* STEP 5: TIMELINE */}
      <div className="srd-section">
        <h2 className="srd-section-title">Request Timeline</h2>

        <div className="srd-card">
          <div className="srd-timeline">
            <TimelineItem
              title="Request Submitted"
              date={formatDate(request.createdAt)}
              active
            />

            <TimelineItem
              title="Payment Completed"
              date={
                request.paymentStatus === "Paid"
                  ? formatDate(request.invoice?.paidAt)
                  : "Pending"
              }
              active={request.paymentStatus === "Paid"}
            />

            <TimelineItem
              title="Under Review"
              active={["Assigned", "In Progress", "Done"].includes(
                request.status
              )}
            />

            <TimelineItem
              title="In Progress"
              active={["In Progress", "Done"].includes(request.status)}
            />

            <TimelineItem
              title="Completed"
              active={request.status === "Done"}
            />
          </div>
        </div>
      </div>

      {/* Work File upload */}

      <div className="srd-section">
        <h2 className="srd-section-title">Work Files</h2>

        <div className="srd-card">
          {request.files && request.files.length > 0 ? (
            <div className="srd-file-list">
              {request.files.map((file) => (
                <div className="srd-file-item" key={file._id}>
                  <div className="srd-file-info">
                    <span className="srd-file-name">{file.documentName}</span>
                    <span className="srd-file-type">
                      Uploaded on {formatDate(file.uploadedAt)}
                    </span>
                  </div>

                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="srd-file-action"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="srd-empty-text">
              Work files will appear here once processing is completed.
            </p>
          )}
        </div>
      </div>

{/* 6. Support */}
<div className="srd-section">
  <h2 className="srd-section-title">Need Help?</h2>

  <div className="srd-card srd-support-card">
    <div className="srd-support-left">
      <p className="srd-support-text">
        If you have any questions or issues related to this service request,
        our support team is here to help you.
      </p>
      <span className="srd-support-ref">
        Reference ID: <strong>{getShortId(request._id)}</strong>
      </span>
    </div>

    <div className="srd-support-actions">
      <button
        className="srd-btn srd-btn-outline"
        onClick={() =>
          navigate("/support", {
            state: { requestId: request._id },
          })
        }
      >
        Contact Support
      </button>
    </div>
  </div>
</div>


{/* 7. Cancel Request */}
{canCancel && (
  <div className="srd-section">
    <h2 className="srd-section-title srd-danger-title">
      Cancel Request
    </h2>

    <div className="srd-card srd-danger-card">
      <p className="srd-danger-text">
        Cancelling this request is irreversible. If payment has already
        been made, refunds (if applicable) will be processed according to
        our policy.
      </p>

      <button
        className="srd-btn srd-btn-danger"
        onClick={() => setShowCancelConfirm(true)}
      >
        Cancel This Request
      </button>
    </div>
  </div>
)}


      {/* Cancel Confirmation Modal */}
{showCancelConfirm && (
  <div className="srd-modal-backdrop">
    <div className="srd-modal">
      <h3 className="srd-modal-title">Confirm Cancellation</h3>

      <p className="srd-modal-text">
        Are you sure you want to cancel this request? This action cannot be
        undone.
      </p>

      <div className="srd-modal-actions">
        <button
          className="srd-btn srd-btn-secondary"
          onClick={() => setShowCancelConfirm(false)}
        >
          Keep Request
        </button>

        <button
          className="srd-btn srd-btn-danger"
          onClick={async () => {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/service-requests/${id}/cancel`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              setShowCancelConfirm(false);
              fetchRequestDetails();
            } catch (err) {
              console.error("Cancel failed", err);
            }
          }}
        >
          Yes, Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

const TimelineItem = ({ title, date, active }) => {
  return (
    <div className={`srd-timeline-item ${active ? "active" : ""}`}>
      <div className="srd-timeline-dot" />
      <div className="srd-timeline-content">
        <strong>{title}</strong>
        {date && <span>{date}</span>}
      </div>
    </div>
  );
};

export default MyServiceRequestDetail;
