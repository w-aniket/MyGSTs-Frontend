import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ContactRequest.css";

const ContactRequests = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contact`
      );
      setList(res.data);
    } catch (error) {
      console.error("Failed to load contact requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <h2>Contact Requests</h2>

      {/* Loading State */}
      {loading && <p className="loading-text">Loading...</p>}

      {/* Empty State */}
      {!loading && list.length === 0 && (
        <p className="empty-text">No contact requests found.</p>
      )}

      {!loading && list.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr
                key={item._id}
                onClick={() => navigate(`/admin/contact-request/${item._id}`)}
                className="clickable-row"
              >
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message.slice(0, 15)}...</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactRequests;
