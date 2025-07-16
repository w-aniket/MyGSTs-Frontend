
import React from "react";

const StatusDropdown = ({ currentStatus, onChange }) => {
  return (
    <>
      <label className="emp-dashboard_label">Update Status</label>
      <select
        className="emp-dashboard_select"
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Assigned">Assigned</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </>
  );
};

export default StatusDropdown;
