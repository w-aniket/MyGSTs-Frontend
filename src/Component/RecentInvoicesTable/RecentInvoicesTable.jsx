import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentInvoicesTable.css";
import { downloadInvoice } from "../../Utils/Invoice/downloadInvoice";
import Pagination from "../../Admin/Components/Pagination/Pagination";
import SearchFilter from "../../Admin/Components/SearchFilter/SearchFilter";

const RecentInvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${apiUrl}/api/invoices?page=${pagination.page}&limit=5&search=${searchTerm}`,
          config,
        );
        setInvoices(res.data.invoices);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error("Error fetching invoices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [pagination.page, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="recent-invoices-table">
      <h4>Recent Invoices</h4>

      {/* Search */}
      <div className="serach-field">
        <SearchFilter onSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading-message">
                  {" "}
                  Loading...
                </td>
              </tr>
            ) : invoices.length > 0 ? (
              invoices.map((inv) => (
                <tr key={inv._id}>
                  <td>{inv.invoiceNumber}</td>
                  <td>
                    {inv.client?.firstName || ""}{" "}
                    {inv.client?.lastName || "Unknown"}
                  </td>
                  <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td>₹ {inv.amount.toLocaleString()}</td>
                  {inv.isPaid ? (
                    <td className="status-paid">
                      <button onClick={() => downloadInvoice(inv._id)}>
                        Download
                      </button>
                    </td>
                  ) : (
                    <td className="status-pending">Pending</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RecentInvoicesTable;
