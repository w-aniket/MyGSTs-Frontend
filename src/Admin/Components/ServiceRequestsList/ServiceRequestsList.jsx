import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ServiceRequestList.css";
import Pagination from "../Pagination/Pagination";
import SearchFilter from "../SearchFilter/SearchFilter";

export default function ServiceRequestList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const loadRequests = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${apiUrl}/api/service-requests?page=${page}&limit=5&search=${searchTerm}`,
        authHeader,
      );

      setRequests(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Error loading requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests(pagination.page, search);
  }, [pagination.page, search]);

  const handleSearch = (value) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // reset to first page
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="sr-container">
      <h2 className="sr-title">Service Requests</h2>
      <div className="serach-field">
        <SearchFilter onSearch={handleSearch} searchTerm={search} />
      </div>
      <div className="sr-table-wrapper">
        <table className="sr-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="sr-empty">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="sr-empty">
                  No service requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.name || "N/A"}</td>
                  <td>{req.email || "N/A"}</td>
                  <td>{req.service?.title || "N/A"}</td>
                  <td>
                    <span
                      className={`sr-status sr-status-${req.status?.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                  <td>
                    <Link
                      to={`/admin/service-request/${req._id}`}
                      className="sr-action-btn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
