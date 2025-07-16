import React from "react";
import AssignMembersForm from "./AssignMembersForm";
import StatusDropdown from "./StatusDropDown";
import AttachmentViewer from "../../../Admin/Components/AttachmentViewer/AttachmentViewer";
import EmployeeStatusUpdate from "../../Components/EmployeeStatusUpdate/EmployeeStatusUpdate";

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
  const latestStatus =
    request?.employeeUpdates?.length > 0
      ? request.employeeUpdates.at(-1).status
      : "In Progress";

  const originalAssignedIds = (request.assignedMembers || []).map((m) =>
    typeof m === "object" ? m._id : m
  );
  const currentIds = editedAssignments[request._id] ?? originalAssignedIds;

  const myUpdates = (request?.employeeUpdates || []).filter(
    (u) => u?.comment || u?.files?.length > 0
  );

  return (
    <div className="emp-dashboard_card">
      <p>
        <strong>Service:</strong> {request.service?.title}
      </p>
      <p>
        <strong>Status:</strong> {request.status}
      </p>
      <p>
        <strong>Customer:</strong> {request.user?.firstName}
      </p>
      <p>
        <strong>Description:</strong> {request.description}
      </p>
      <AttachmentViewer
        files={
          request.files?.length > 0
            ? request.files
            : request.file
            ? [request.file]
            : []
        }
        requestId={request._id}
      />

      {["leader", "admin"].includes(user.role) && (
        <>
          <StatusDropdown
            currentStatus={request.status}
            onChange={(status) =>
              onStatusUpdate(request._id, status, request.comment || "")
            }
          />

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
        </>
      )}
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
