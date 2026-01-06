import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  fetchRequestDetails,
  fetchSupportTicket,
} from "../../../../Utils/APIs/serviceRequestApi";
import { formatDate, getShortId } from "../../../../Utils/basicFunctions";
import { downloadInvoice } from "../../../../Utils/Invoice/downloadInvoice";
import SupportSection from "./SupportSection";
import "./MyServiceRequestDetail.css";

const MyServiceRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const showSuccess = location.state?.supportSubmitted;
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [request, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supportTicket, setSupportTicket] = useState(null);

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

  // fetch support ticket if any
  useEffect(() => {
    if (!request?._id) return;

    const getSupportTicket = async () => {
      try {
        const res = await fetchSupportTicket(request._id);
        setSupportTicket(res.data);
      } catch (error) {
        console.error("Failed to fetch support ticket", error);
      }
    };

    getSupportTicket();
  }, [request?._id]);

  const scrollToWorkFiles = () => {
    const el = document.getElementById("work-files-section");
    if (!el) return;

    const yOffset = -150; // header height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    // Add highlight
    el.classList.add("srd-scroll-highlight");

    // Remove highlight after 1 second
    setTimeout(() => {
      el.classList.remove("srd-scroll-highlight");
    }, 2000);
  };

  const handlePayNow = () => {
    navigate(`/service-requests/confirmation/${id}`, {
      state: {
        serviceName: request.service?.title,
        amount: request.amount,
      },
    });
  };
  const canCancel =
    request?.status !== "Done" && request?.status !== "Cancelled";

  if (loading) {
    return <p className="message loading">Loading request detail...</p>;
  }

  if (!request) {
    return <p className="message error">Request not found</p>;
  }

  return (
    <div className="srd-page">
      {showSuccess && (
        <div className="srd-success-banner">
          Support ticket submitted successfully. Our team will contact you soon.
        </div>
      )}
      {/* Header */}
      <div className="srd-header">
        <div>
          <h1>{request.service?.title}</h1>
          <p className="srd-sub">
            Reqeist ID: <strong>{id}</strong>
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
              className="srd-btn srd-btn-view-files"
              onClick={scrollToWorkFiles}
            >
              View Work Files
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
              <strong>{id}</strong>
            </div>

            <div className="srd-info-item">
              <span>Service</span>
              <strong>{request.service?.title}</strong>
            </div>

            <div className="srd-info-item">
              <span>Request Status</span>
              <strong>{request.status}</strong>
            </div>

            <div className="srd-info-item">
              <span>Payment Status</span>
              <strong>{request.paymentStatus}</strong>
            </div>

            <div className="srd-info-item">
              <span>Total Amount</span>
              <strong>₹{request.amount}</strong>
            </div>

            <div className="srd-info-item">
              <span>Submitted On</span>
              <strong>{formatDate(request.createdAt)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* client Information */}

      <div className="srd-section">
        <h2 className="srd-section-title">Client Information</h2>

        <div className="srd-card">
          <div className="srd-info-grid">
            <div className="srd-info-item">
              <span>Name</span>
              <strong>
                {request.user?.firstName} {request.user?.lastName}
              </strong>
            </div>

            <div className="srd-info-item">
              <span>Mobile</span>
              <strong>{request.user?.phone}</strong>
            </div>

            <div className="srd-info-item">
              <span>Email</span>
              <strong>{request.user?.email}</strong>
            </div>

            <div className="srd-info-item">
              <span>Business Name</span>
              <strong>{request.companyName}</strong>
            </div>

            <div className="srd-info-item">
              <span>GST Number</span>
              {request.client?.gstNumber ? (
                <strong>
                  {request.client.gstNumber.replace(
                    /^(.{2}).*(.{4})$/,
                    "$1****$2"
                  )}
                </strong>
              ) : (
                <strong>-</strong>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* description */}

      {request.description && (
        <div className="srd-section">
          <h2 className="srd-section-title">Request Description</h2>

          <div className="srd-card">
            <p className="srd-description-text">{request.description}</p>
          </div>
        </div>
      )}
      {!request.description && (
        <p className="srd-empty-text">
          No additional description was provided by the client.
        </p>
      )}

      {/* Payment */}

      <div className="srd-section">
        <h2 className="srd-section-title">Payment Details</h2>

        {request.paymentStatus === "Pending" ? (
          <div className="srd-card">
            <div className="srd-info-grid">
              <div className="srd-info-item">
                <span>Amount</span>
                <strong>₹{request.amount}</strong>
              </div>

              <div className="srd-info-item">
                <span>Payment Status</span>
                <strong className="text-warning">Pending</strong>
              </div>
            </div>

            <div className="srd-payment-actions">
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
            </div>
          </div>
        ) : request.paymentStatus === "Paid" ? (
          <div className="srd-card">
            <div className="srd-info-grid">
              <div className="srd-info-item">
                <span>Amount Paid</span>
                <strong>₹{request.amount}</strong>
              </div>

              <div className="srd-info-item">
                <span>Payment Status</span>
                <strong className="text-success">Paid</strong>
              </div>

              <div className="srd-info-item">
                <span>Paid On</span>
                <strong>{formatDate(request.invoice?.paidAt)}</strong>
              </div>

              <div className="srd-info-item">
                <span>Transaction ID</span>
                <strong>
                  {request.invoice?.paymentDetails?.transactionId}
                </strong>
              </div>
            </div>

            <div className="srd-payment-actions">
              <button
                className="srd-btn srd-btn-secondary"
                onClick={() => downloadInvoice(request.invoice?._id)}
              >
                Download Invoice
              </button>
            </div>
          </div>
        ) : null}
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

      <div className="srd-section" id="work-files-section">
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
      <SupportSection
        displayId={id}
        requestId={request._id}
        supportTicket={supportTicket}
      />

      {/* 7. Cancel Request */}
      {canCancel && (
        <div className="srd-section">
          <h2 className="srd-section-title srd-danger-title">Cancel Request</h2>

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
              Are you sure you want to cancel this request? This action cannot
              be undone.
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
                      `${
                        import.meta.env.VITE_API_URL
                      }/api/service-requests/${id}/cancel`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
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
