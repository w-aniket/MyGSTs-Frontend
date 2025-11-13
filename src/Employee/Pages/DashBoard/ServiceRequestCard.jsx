import React, { useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AssignMembersForm from "./AssignMembersForm";
import StatusDropdown from "./StatusDropDown";
import AttachmentViewer from "../../../Admin/Components/AttachmentViewer/AttachmentViewer";
import EmployeeStatusUpdate from "../../Components/EmployeeStatusUpdate/EmployeeStatusUpdate";
import "./serviceRequestCard.css";
const ServiceRequestCard = ({
  request,
  user,
  members,
  onRefresh,
  editedAssignments,
  savingAssignments,
  onMemberChange,
  onSaveMembers,
  onStatusUpdate,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const latestStatus =
    request?.employeeUpdates?.length > 0
      ? request.employeeUpdates.at(-1).status
      : request.status;

  const originalAssignedIds = (request.assignedMembers || []).map((m) =>
    typeof m === "object" ? m._id : m
  );
  const currentIds = editedAssignments[request._id] ?? originalAssignedIds;

  const myUpdates = request?.employeeUpdates || [];

  // --- Amount state for Admin/Leader ---
  const [amountInput, setAmountInput] = useState(
    typeof request.amount === "number" ? String(request.amount) : ""
  );
  const [savingAmount, setSavingAmount] = useState(false);

  const isAdminOrLeader = useMemo(
    () => ["leader", "admin"].includes(user?.role),
    [user?.role]
  );

  const formattedCurrentAmount = useMemo(() => {
    return typeof request.amount === "number"
      ? `₹${request.amount.toLocaleString("en-IN")}`
      : "—";
  }, [request.amount]);

  const handleSaveAmount = async () => {
    const num = Number(amountInput);
    if (isNaN(num)) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (num < 0) {
      toast.error("Amount cannot be negative");
      return;
    }
    if (request.amount === num) {
      toast.info("Amount unchanged");
      return;
    }

    try {
      setSavingAmount(true);
      await axios.patch(
        `${apiUrl}/api/service-requests/${request._id}/amount`,
        {
          amount: num,
        },
        { headers }
      );
      toast.success("Amount saved");
      await onRefresh?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to save amount");
    } finally {
      setSavingAmount(false);
    }
  };

  return (
    <div className="emp-dashboard_card">
      <p>
        <strong>Client name:</strong> {request.name} / {request?.user.firstName}{" "}
        {request?.user.lastName}
      </p>
      {(user.role === "admin" || user.role === "leader") && (
        <>
          <p>
            <strong>Email:</strong> {request.email} / {request?.user.email}
          </p>

          <p>
            <strong>Contact:</strong> {request.phone}
          </p>
        </>
      )}
      <p>
        <strong>Service:</strong> {request.service?.title}
      </p>
      <p>
        <strong>Description:</strong> {request.description}
      </p>
      <p>
        <strong>Status:</strong>
        <span
          className={`status-badge status-${request?.status.toLowerCase()}`}
        >
          {request.status}
        </span>
      </p>

      {/* Files */}
      <AttachmentViewer files={request.files || []} requestId={request._id} />

      {/* --- Admin/Leader controls --- */}
      {isAdminOrLeader && (
        <>
          {/* Status */}
          <StatusDropdown
            currentStatus={request.status}
            onChange={(status) => onStatusUpdate(request._id, status, "")}
          />

          {/* Assign Members */}
          <AssignMembersForm
            requestId={request._id}
            members={members}
            currentIds={currentIds}
            originalIds={originalAssignedIds}
            onChange={onMemberChange}
            onSave={onSaveMembers}
            isSaving={savingAssignments[request._id]}
          />

          <p className="emp-dashboard_label">Currently Assigned:</p>
          <ul className="emp-dashboard_list">
            {(request.assignedMembers || []).map((mem) => (
              <li key={mem._id || mem}>
                ✅ {mem.firstName || "Unknown"} {mem.lastName || ""}
              </li>
            ))}
          </ul>

          {/* --- Set Amount --- */}
          <div className="emp-dashboard_amount" style={{ marginTop: 12 }}>
            <label
              className="emp-dashboard_label"
              htmlFor={`amt-${request._id}`}
            >
              Amount (₹)
            </label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                id={`amt-${request._id}`}
                type="number"
                min="0"
                step="0.01"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="emp-dashboard_input"
                placeholder="Enter amount"
                style={{ maxWidth: 160 }}
              />
              <button
                className="emp-dashboard_btn"
                onClick={handleSaveAmount}
                disabled={savingAmount}
              >
                {savingAmount ? "Saving..." : "Save Amount"}
              </button>
              <span style={{ opacity: 0.8 }}>
                Current: <strong>{formattedCurrentAmount}</strong>
              </span>
            </div>
          </div>
        </>
      )}

      {/* Employee updates */}
      <EmployeeStatusUpdate
        requestId={request._id}
        latestStatus={latestStatus}
        myUpdates={myUpdates}
        onUpdateSuccess={onRefresh}
      />
    </div>
  );
};

export default ServiceRequestCard;
