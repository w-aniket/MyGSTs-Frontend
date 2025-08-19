import React, { useEffect, useState } from "react";
import "./RecentInvoicesTable.css";

const mockInvoices = [
  { id: 1001, client: "Amanda Reed", date: "2025-08-10", amount: 1200, status: "Paid" },
  { id: 1002, client: "Brian Porter", date: "2025-08-08", amount: 800, status: "Pending" },
  { id: 1003, client: "William Reed", date: "2025-08-05", amount: 1000, status: "Paid" },
  { id: 1004, client: "Margaret Curtis", date: "2025-08-03", amount: 1500, status: "Pending" },
  { id: 1005, client: "Nicole Bell", date: "2025-08-02", amount: 950, status: "Paid" },
  { id: 1006, client: "John Smith", date: "2025-07-30", amount: 700, status: "Pending" },
  { id: 1007, client: "Emily Davis", date: "2025-07-28", amount: 1100, status: "Paid" },
  // Add more mock invoices if needed
];

const RecentInvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  useEffect(() => {
    setInvoices(mockInvoices);
  }, []);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(inv.id).includes(searchTerm)
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.client}</td>
                <td>{inv.date}</td>
                <td>${inv.amount.toLocaleString()}</td>
                <td className={inv.status === "Paid" ? "status-paid" : "status-pending"}>
                  {inv.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentInvoicesTable;
