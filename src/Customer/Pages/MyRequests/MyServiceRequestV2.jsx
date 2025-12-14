import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyServiceRequestV2.css";

const MyServiceRequestV2 = () => {
  const navigate = useNavigate();

  // Dummy data (replace with API data)
  const requests = [
    {
      id: "SR-10234",
      service: "GST Registration",
      date: "12 Dec 2025",
      amount: 1499,
      paymentStatus: "Pending",
      serviceStatus: "Under Review",
    },
    {
      id: "SR-10212",
      service: "ITR Filing",
      date: "05 Dec 2025",
      amount: 999,
      paymentStatus: "Paid",
      serviceStatus: "In Progress",
    },
  ];

  return (
    <div className="msr-page">
      <div className="msr-header">
        <h1>My Service Requests</h1>
        <p>View and manage all your submitted service requests.</p>
      </div>

      {requests.length === 0 ? (
        <div className="msr-empty">
          <h3>No service requests found</h3>
          <p>You haven’t submitted any service requests yet.</p>
          <button onClick={() => navigate("/services")}>Explore Services</button>
        </div>
      ) : (
        <div className="msr-list">
          {requests.map((req) => (
            <div className="msr-card" key={req.id}>
              <div className="msr-card-top">
                <h3>{req.service}</h3>
                <span className={`badge ${req.paymentStatus.toLowerCase()}`}>
                  {req.paymentStatus}
                </span>
              </div>

              <div className="msr-info">
                <div><span>Request ID</span><strong>{req.id}</strong></div>
                <div><span>Submitted</span><strong>{req.date}</strong></div>
                <div><span>Amount</span><strong>₹{req.amount}</strong></div>
                <div><span>Status</span><strong>{req.serviceStatus}</strong></div>
              </div>

              <div className="msr-actions">
                {req.paymentStatus === "Pending" && (
                  <button className="primary">Pay Now</button>
                )}
                <button className="outline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServiceRequestV2;