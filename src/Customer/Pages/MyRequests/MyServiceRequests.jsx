import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContex/UserContext";
import "./MyRequests.css";
import { handlePayNow } from "../../../Utils/Payment/payments";
import { useNavigate } from "react-router-dom";
import { formatDate, getShortId } from "../../../Utils/basicFunctions";
import { downloadInvoice } from "../../../Utils/Invoice/downloadInvoice";

const MyServiceRequests = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      setLoading(true);
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

  useEffect(() => setPage(1), [filter]);

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [page]);


  const filteredRequests = requests.filter((req) =>
    filter === "all" ? true : req.paymentStatus.toLowerCase() === filter
  );

  const paginatedRequests = filteredRequests.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredRequests.length / PAGE_SIZE);

  if (loading) {
    return <p className="message loading">Loading your service requests...</p>;
  }

  return (
    <div className="msr-page">
      <div className="msr-header">
        <h1>My Service Requests</h1>
        <p>View and manage all your submitted requests.</p>
      </div>
      <div className="msr-filters">
        {["all", "paid", "pending"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {requests.length === 0 ? (
        <div className="msr-empty">
          <h3>No service requests found</h3>
          <p>You havent't submitted any service requests yet.</p>
          <button onClick={() => navigate("/services")}>
            Explore Services
          </button>
        </div>
      ) : (
        <div className="msr-list">
          {paginatedRequests.map((req) => (
            <div className="msr-card" key={req._id}>
              <div className="msr-card-top">
                <h3>{req.service?.title}</h3>
                <span className={`badge ${req.paymentStatus.toLowerCase()}`}>
                  {req.paymentStatus}
                </span>
              </div>

              <div className="msr-info">
                <div>
                  <span>Request Id</span>
                  <strong>#{getShortId(req._id)}</strong>
                </div>
                <div>
                  <span>Submitted</span>
                  <strong>{formatDate(req.createdAt)}</strong>
                </div>
                <div>
                  <span>Amount</span>
                  <strong>{req.amount}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{req.status}</strong>
                </div>
              </div>

              <div className="msr-actions">
                {req.paymentStatus === "Pending" ? (
                  <button
                    className="primary"
                    onClick={() =>
                      handlePayNow(navigate, req._id, Number(req.amount))
                    }
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    className="btn-invoice"
                    onClick={() => downloadInvoice(req.invoice?._id)}
                  >
                    Invoice
                  </button>
                )}
                <button className="outline" onClick={() => navigate(`${req._id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="msr-pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyServiceRequests;
