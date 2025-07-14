import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContex/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!user) return <div>Loading...</div>;

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/service-requests/assigned`, {
        headers,
      });
      if (res.data && res.data?.requests) {
        setRequests(res.data?.requests || []);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching requests", error);
      const msg = error.responce?.data?.message || "Error loading data";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/teams/members`, { headers });
      setMembers(res.data?.members || []);
    } catch (error) {
      console.error("Failed to fetch menbers", error);
      toast.error("Could not load team members");
    }
  };

  const assignMembers = async (reqId, memberIds) => {
    try {
      await axios.patch(
        `${apiUrl}/api/service-requests/${reqId}/assign-members`,
        { members: memberIds },
        { headers }
      );
      toast.success("Members Updated");
      fetchRequests();
    } catch (error) {
      console.error("Error Updating members:", error);
      toast.error("Assignment failed");
    }
  };

  const updateStatus = async (id, status, comment = "") => {
    try {
      const res = await axios.patch(
        `${apiUrl}/api/service-requests/${id}/status`,
        { status, comment },
        { headers }
      );
      toast.success(res.data?.message || "Status updated");
      fetchRequests();
    } catch (error) {
      console.error("Error updatig status:", error);
      const msg = error?.response?.data?.message || "Failed to update";
      toast.error(msg);
    }
  };

  useEffect(() => {
    if (user?.role === "leader" || user?.role === "admin") {
      fetchMembers();
    }

    if (
      user?.role === "leader" ||
      user?.role === "employee" ||
      user?.role === "admin"
    ) {
      fetchRequests();
    }
  }, [user]);

  if (!user || loading)
    return <div className="emp-dashboard">Loading dashboard...</div>;

  if (
    user.role !== "leader" &&
    user.role !== "employee" &&
    user.role !== "admin"
  ) {
    return (
      <div className="emp-dashboard text-red-600">
        You are not authorized to view this dashboard.
      </div>
    );
  }
  console.log(requests);
  return (
    <div className="emp-dashboard">
      <h2 className="emp-dashboard_title">
        {user.role === "leader" || user.role === "admin"
          ? "Team Leader Dashboard"
          : "My Tasks "}
      </h2>

      {requests.length === 0 ? (
        <p>No task assigned to you</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="emp-dashboard_card">
            <p>
              <strong>Service:</strong> {req.service?.title}
            </p>
            <p>
              <strong>status:</strong> {req.status}
            </p>
            <p>
              <strong>Customer:</strong> {req.user?.firstName}
            </p>
            <p>
              <strong>Description:</strong> {req.description}
            </p>
            {(user.role === "leader" || user.role === "admin") && (
              <>
                <label htmlFor="" className="emp-dashboard_label">
                  Update Status
                </label>
                <select
                  value={req.status}
                  className="emp-dashboard_select"
                  onChange={(e) =>
                    updateStatus(req._id, e.target.value, req.comment || "")
                  }
                >
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <label htmlFor="" className="emp-dashboard_label">
                  Assign Member
                </label>
                <div className="emp-dashboard_checkbox-group">
                  {members.map((member) => {
                    const assignedIds = (req.assignedMembers || []).map((m) =>
                      typeof m === "object" ? m._id : m
                    );

                    const isChecked = assignedIds.includes(member._id);

                    const handleCheckboxChange = (e) => {
                      const updatedMembers = e.target.checked
                        ? [...assignedIds, member._id] // add
                        : assignedIds.filter((id) => id !== member._id); // remove

                      assignMembers(req._id, updatedMembers);
                    };

                    return (
                      <label
                        key={member._id}
                        className="emp-dashboard_checkbox-label"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className="emp-dashboard_checkbox"
                        />
                        {member.firstName} {member.lastName}
                      </label>
                    );
                  })}
                </div>

                <p className="emp-dashboard_label">Currently Assigned:</p>
                <ul className="emp-dashboard_list">
                  {req.assignedMembers?.map((mem) => (
                    <li key={mem._id}>
                      ✅ {mem.firstName} {mem.lastName}
                    </li>
                  ))}
                </ul>
                {/* <textarea
                  className = "emp-dashboard_textarea"
                  placeholder="Add a comment (optional)"
                  defaultValue={req.comment}
                /> */}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeDashboard;
