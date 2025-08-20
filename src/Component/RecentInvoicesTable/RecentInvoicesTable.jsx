import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentInvoicesTable.css";

const RecentInvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const downloadInvoice = async (invoiceId) => {
      try {
        const url = `${apiUrl}/api/invoices/${invoiceId}/download`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });
        const blob = new Blob([res.data], { type: "application/pdf" });
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
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/invoices`, config);
        setInvoices(res.data);
      } catch (err) {
        console.error("Error fetching invoices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // ✅ Fix: use client.name and invoiceNumber
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(inv.invoiceNumber).includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  const indexOfLast = currentPage * invoicesPerPage;
  const indexOfFirst = indexOfLast - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p>Loading invoices...</p>;

  return (
    <div className="invoices-table">
      <h4>Recent Invoices</h4>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by client or invoice #"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page on search
        }}
        className="invoice-search-input"
      />

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
            {currentInvoices.length > 0 ? (
              currentInvoices.map((inv) => (
                <tr key={inv._id}>
                  <td>{inv.invoiceNumber}</td>
                  <td>{inv.client?.firstName || ""} {inv.client?.lastName || "Unknown"}</td>
                  <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td>₹ {inv.amount.toLocaleString()}</td>
                  <td
                    className="status-paid"
                  ><button onClick={() =>downloadInvoice(inv._id)}>
                    Download
                  </button>
                  </td>
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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentInvoicesTable;
