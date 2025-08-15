import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContex/UserContext";
import "./MyRequests.css";
import AttachmentViewer from "../../../Admin/Components/AttachmentViewer/AttachmentViewer";
import { toast } from "react-toastify";
import { color } from "@mui/system";

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

  const handlePayNow = async (invoice) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        { invoiceId: invoice._id, amount: invoice.amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { order, key } = res.data;

      const options = {
        key,
        amount: order.amount,
        name: "Accounting Services",
        currency: "INR",
        description: "Invoice Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                invoiceId: invoice._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (verifyRes.data.success) {
              toast.success("Payment successfull by aniket");
              fetchRequests();
            }
          } catch (error) {
            console.error("Verification failed", error);
          }
        },
        theme: {
          color: "#0d6efd",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  const downloadInvoice = async (invoiceId) => {
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/invoices/${invoiceId}/download`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
      const blob = new Blob([res.data], {type: "application/pdf"});
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Invoice download failed", err);
      toast.error("Failed to download invoice");
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

              {req.status === "Done" && req.invoice && (
                <div className="payment-section">
                  <p className="invoice-amount">
                    Amount: ₹ {req.invoice?.amount}
                  </p>
                  {req.invoice?.isPaid ? (
                    <>
                      <span className="paid-badge">Paid</span>
                      <button
                        className="paid-badge download-invoice-btn"
                        onClick={() => downloadInvoice(req.invoice?._id)}
                      >
                        Invoice
                      </button>
                    </>
                  ) : (
                    <button
                      className="pay-now-btn"
                      onClick={() => handlePayNow(req.invoice)}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServiceRequests;
