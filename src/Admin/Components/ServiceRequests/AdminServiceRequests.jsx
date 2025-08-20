import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminServiceRequests.css";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import SearchFilter from "../SearchFilter/SearchFilter";
import ServiceRequestCard from "../../../Employee/Pages/DashBoard/ServiceRequestCard";
import InvoiceModal from "../../../Component/InvoiceModal/InvoiceModal";

const AdminServiceRequests = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [assignTarget, setAssignTarget] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [invoiceModal, setInvoiceModal] = useState({
    open: false,
    requestId: null,
  });
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("false"); 

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const [detailReq, setDetailReq] = useState(null);
  

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/service-requests?completed=${filterCompleted}`, authHeader);
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error fetching service requests", err);
    }
  };

  const fetchMembersByLeader = async (leaderId) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/admin/team/members/${leaderId}`,
        authHeader
      );
      return res.data.members;
    } catch (error) {
      console.error("Failed to fetch members for leader", error);
      return [];
    }
  };

  const renderPaymentStatus = (req) => {
    if (req.invoice)
      return <span className="status-badge paid">₹ {req.amount}/- Paid ✔</span>;
    if (req.amount)
      return (
        <span className="status-badge pending-payment">
          ₹ {req.amount}/- Pending ⏳
        </span>
      );
    return <span className="status-badge set-amount">Set Amount 💰</span>;
  };

  const updateStatus = async (id, newStatus, amount = null) => {
    const body = { status: newStatus };
    if (newStatus === "Done" && amount) {
      body.amount = amount;
    }
    try {
      await axios.patch(
        `${apiUrl}/api/service-requests/${id}/status`,
        body,
        authHeader
      );
      toast.success("Status updated");
      fetchRequests();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
      console.error("Failed to update status", error);
    } finally {
      setInvoiceAmount("");
      setInvoiceModal({ open: false, requestId: null });
    }
  };

  const openAssignModel = async (req) => {
    setAssignTarget(req);
    setSelectedEmp("");
    if (employees.length === 0) {
      try {
        const res = await axios.get(`${apiUrl}/api/user/employees`, authHeader);
        setEmployees(res.data.employees);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    }
  };

  const handleAssign = async () => {
    if (!selectedEmp) {
      toast.error("Select Employee!");
      return;
    }

    try {
      const res = await axios.patch(
        `${apiUrl}/api/service-requests/${assignTarget._id}/assign`,
        { employeeId: selectedEmp },
        authHeader
      );
      setRequests((prev) =>
        prev.map((r) =>
          r._id === assignTarget._id ? { ...r, ...res.data.request } : r
        )
      );
      setAssignTarget(null);
    } catch (err) {
      console.error("Failed to assign employee", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filterCompleted]);

  useEffect(() => {
    const filtered = requests.filter(
      (req) =>
        (req.user?.firstName + " " + req.user?.lastName || "Guest")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (req.service?.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        req.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [searchTerm, requests]);

  useEffect(() => {
    const loadTeamMembers = async () => {
      if (detailReq?.assignedTo?._id) {
        const members = await fetchMembersByLeader(detailReq.assignedTo._id);
        setTeamMembers(members);
      }
    };
    loadTeamMembers();
  }, [detailReq]);

  return (
    <div className="admin-service-requests">
      <h2 className="title">Service Requests</h2>
      <div className="filter-bar">

      <SearchFilter  searchTerm={searchTerm} onSearch={setSearchTerm} />
      <select
        value={filterCompleted}
        className="status-filter"
        onChange={(e) => setFilterCompleted(e.target.value)}
      >
        <option value="false">Active Requests</option>
        <option value="true">Completed Requests</option>
        <option value="all">All Requests</option>
      </select>
      </div>

      <table className="request-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Service</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Assign</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="8">No requests found</td>
            </tr>
          ) : (
            currentItems.map((req) => (
              <tr key={req._id}>
                <td>
                  {req.user?.firstName || ""} {req.user?.lastName || "Guest"}
                </td>
                <td>{req.service?.title || "N/A"}</td>
                <td>
                  <select
                    className={`status-select ${req.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td>{renderPaymentStatus(req)}</td>

                <td>
                  {req.assignedTo ? (
                    <button
                      className="assign-btn"
                      onClick={() => openAssignModel(req)}
                    >
                      {req.assignedTo?.firstName
                        ? `${req.assignedTo?.firstName} ${req.assignedTo?.lastName}`
                        : "Assign"}
                    </button>
                  ) : (
                    <button
                      className="assign-btn"
                      onClick={() => openAssignModel(req)}
                    >
                      Assign
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setDetailReq(req)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {assignTarget && (
        <div className="modal-overlay">
          <div className="modal-box responsive">
            <h3 className="modal-title">Assign Employee</h3>
            <p className="modal-service">
              <span>Service:</span>
              <strong>
                {assignTarget.service.title || "Untitled Service"}
              </strong>
            </p>
            <select
              className="modal-select"
              value={selectedEmp}
              onChange={(e) => setSelectedEmp(e.target.value)}
            >
              <option value="">Select employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName} ({emp.email})
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="modal-btn" onClick={handleAssign}>
                Assign
              </button>
              <button
                className="modal-btn cancel"
                onClick={() => setAssignTarget(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {detailReq && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title">Request Detail</h3>
            <button
              className="modal-btn cancel"
              onClick={() => setDetailReq(null)}
            >
              ❌ Close
            </button>
            <ServiceRequestCard
              request={detailReq}
              user={{ role: "admin" }} // or pass actual admin user object if needed
              members={teamMembers} // or fetch/skip if not needed
              onRefresh={fetchRequests}
              editedAssignments={{}} // optional, not needed if you're not editing
              savingAssignments={{}} // same here
              onMemberChange={() => {}}
              onSaveMembers={() => {}}
              onStatusUpdate={() => {}}
            />
          </div>
        </div>
      )}

      {invoiceModal.open && (
        <InvoiceModal
          amount={invoiceAmount}
          onChange={setInvoiceAmount}
          onSubmit={() =>
            updateStatus(invoiceModal.requestId, "Done", invoiceAmount)
          }
          onCancel={() => {
            setInvoiceModal({ open: false, requestId: null });
            setInvoiceAmount("");
          }}
        />
      )}
    </div>
  );
};

export default AdminServiceRequests;
