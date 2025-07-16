import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContex/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./EmployeeDashboard.css";
import ServiceRequestCard from "./ServiceRequestCard";

const EmployeeDashboard = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [editedAssignments, setEditedAssignments] = useState({});
  const [savingAssignments, setSavingAssignments] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null); // ⬅️ New

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/service-requests/assigned`, { headers });
      setRequests(res.data?.requests || []);
    } catch (error) {
      console.error("Error fetching requests", error);
      toast.error(error.response?.data?.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/teams/members`, { headers });
      setMembers(res.data?.members || []);
    } catch (error) {
      console.error("Failed to fetch members", error);
      toast.error("Could not load team members");
    }
  };

  const assignMembers = async (reqId, memberIds) => {
    try {
      setSavingAssignments((prev) => ({ ...prev, [reqId]: true }));
      await axios.patch(`${apiUrl}/api/service-requests/${reqId}/assign-members`, { members: memberIds }, { headers });
      toast.success("Members Updated");
      fetchRequests();
      setEditedAssignments((prev) => {
        const updated = { ...prev };
        delete updated[reqId];
        return updated;
      });
    } catch (error) {
      toast.error("Assignment failed");
    } finally {
      setSavingAssignments((prev) => ({ ...prev, [reqId]: false }));
    }
  };

  const updateStatus = async (id, status, comment = "") => {
    try {
      await axios.patch(`${apiUrl}/api/service-requests/${id}/status`, { status, comment }, { headers });
      toast.success("Status updated");
      fetchRequests();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update");
    }
  };

  useEffect(() => {
    if (["leader", "admin"].includes(user?.role)) fetchMembers();
    if (["leader", "employee", "admin"].includes(user?.role)) fetchRequests();
  }, [user]);
  useEffect(() => {
  if (selectedRequest) {
    const updated = requests.find((r) => r._id === selectedRequest._id);
    if (updated) {
      setSelectedRequest(updated);
    }
  }
}, [requests]);

  if (!user || loading) return <div className="emp-dashboard">Loading dashboard...</div>;

  if (!["leader", "employee", "admin"].includes(user.role)) {
    return <div className="emp-dashboard text-red-600">You are not authorized to view this dashboard.</div>;
  }

  

  return (
    <div className="emp-dashboard">
      <h2 className="emp-dashboard_title">
        {["leader", "admin"].includes(user.role) ? "Team Leader Dashboard" : "My Tasks"}
      </h2>

      {requests.length === 0 ? (
        <p>No task assigned to you</p>
      ) : (
        <>
          <div className="task-table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Client</th>
                  <th>Description</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} onClick={() => setSelectedRequest(req)}>
                    <td>{req.service?.title}</td>
                    <td>{req.status}</td>
                    <td>{req.user?.firstName || "N/A"}</td>
                    <td>{req.description?.slice(0, 30)}...</td>
                    <td>
                      <button className="view-btn">🔍</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedRequest && (
            <div className="request-detail">
              <h3>Request Details</h3>
              <button onClick={() => setSelectedRequest(null)} className="close-detail">❌ Close</button>
              <ServiceRequestCard
                request={selectedRequest}
                user={user}
                members={members}
                onRefresh={fetchRequests}
                editedAssignments={editedAssignments}
                savingAssignments={savingAssignments}
                onMemberChange={(reqId, newIds) =>
                  setEditedAssignments((prev) => ({
                    ...prev,
                    [reqId]: [...new Set(newIds)],
                  }))
                }
                onSaveMembers={assignMembers}
                onStatusUpdate={updateStatus}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;
