import axios from "axios";
import React, { useState } from "react";
import { updateStatusApi } from "../../../Utils/APIs/serviceRequestApi";
import { toast } from "react-toastify";
import './updateStatus.css'

const StatusUpdate = ({ request, onUpdated }) => {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);

  const statuses = ["Pending", "Assigned", "In Progress", "Done"];

  const updateStatus = async () => {
    setLoading(true);
    try {
      const res = await updateStatusApi(request._id, { status });
      toast.success("Status update successfully");
      onUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="status-box">
      <h3>Update Status</h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={loading}
      >
        {statuses.map((s) => (
          <option value={s} key={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        onClick={updateStatus} disabled={loading || status === request.status}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default StatusUpdate;
