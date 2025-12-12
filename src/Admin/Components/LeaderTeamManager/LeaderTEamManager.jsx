import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import Select from "react-select";
import "./LeaderTeamManager.css";

const LeaderTeamManager = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [name, setName] = useState("");
  const [leader, setLeader] = useState("");
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, teamId: null });
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/users`, {
        headers,
        params: { roles: "admin,leader,employee", noTeam: true },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/teams`, { headers });
      setTeams(res.data.teams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Error fetching teams");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTeams();
  }, []);

  const resetForm = () => {
    setName("");
    setLeader("");
    setEmployees([]);
    setEditingTeam(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !leader) {
      toast.error("Team name and leader are required");
      return;
    }

    try {
      if (editingTeam) {
        await axios.put(
          `${apiUrl}/api/teams/${editingTeam._id}`,
          { name, leader, employees },
          { headers }
        );
        toast.success("Team updated");
      } else {
        await axios.post(
          `${apiUrl}/api/teams`,
          { name, leader, employees },
          { headers }
        );
        toast.success("Team created");
      }
      resetForm();
      await Promise.all([fetchTeams(), fetchUsers()]);
    } catch (error) {
      console.error("Error saving team:", error);
      toast.error(error.response?.data?.message || "Error saving team");
    }
  };

  const startEdit = (team) => {
    setEditingTeam(team);
    setName(team.name);
    setLeader(team.leader?._id || "");
    setEmployees(team.employees?.map((u) => u._id) || []);
  };

  const confirmDeleteTeam = (teamId) => {
    setConfirmDelete({ open: true, teamId });
  };

  const handleDelete = async () => {
    const { teamId } = confirmDelete;
    if (!teamId) return;
    try {
      setDeleting(true);
      await axios.delete(`${apiUrl}/api/teams/${teamId}`, { headers });
      toast.success("Team deleted");
      setConfirmDelete({ open: false, teamId: null });
      await Promise.all([fetchTeams(), fetchUsers()]);
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error("Error deleting team");
    } finally {
      setDeleting(false);
    }
  };

  const selectableUsers = (() => {
    if (!editingTeam) return users;
    const currentTeamUserIds = new Set([
      editingTeam.leader?._id,
      ...(editingTeam.employees?.map((u) => u._id) || []),
    ]);
    const union = [...users];
    editingTeam.employees?.forEach((u) => {
      if (!union.find((x) => x._id === u._id)) union.push(u);
    });
    if (editingTeam.leader && !union.find((x) => x._id === editingTeam.leader._id)) {
      union.push(editingTeam.leader);
    }
    return union;
  })();

  // React-Select custom style to match input fields
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: "#fafafa",
      borderColor: state.isFocused ? "#4a90e2" : "#ccc",
      boxShadow: "none",
      borderRadius: "8px",
      padding: "2px",
      "&:hover": { borderColor: "#4a90e2" },
      minHeight: "42px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      zIndex: 9999,
    }),
    multiValue: (base) => ({
      ...base,
      background: "#eef3fb",
      borderRadius: "6px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#222",
      fontWeight: 500,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#ff5c5c",
      ":hover": { backgroundColor: "#ff5c5c", color: "white" },
    }),
  };

  return (
    <div className="leader-team-manager">
      <h2>{editingTeam ? "Edit Team" : "Create Team"}</h2>

      <form onSubmit={handleSubmit} className="team-form">
        <label>Team Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Leader</label>
        <Select
          options={selectableUsers
            .filter((u) => u.role === "leader" || u.role === "admin")
            .map((u) => ({
              value: u._id,
              label: `${u.firstName} ${u.lastName} ${u.team ? "(in team)" : ""}`,
            }))}
          value={
            leader
              ? {
                  value: leader,
                  label: `${selectableUsers.find((u) => u._id === leader)?.firstName} ${
                    selectableUsers.find((u) => u._id === leader)?.lastName
                  }`,
                }
              : null
          }
          onChange={(selected) => setLeader(selected?.value || "")}
          styles={selectStyles}
        />

        <label>Employees</label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          options={selectableUsers
            .filter((u) => u.role === "employee")
            .map((u) => ({
              value: u._id,
              label: `${u.firstName} ${u.lastName} ${u.team ? "(in team)" : ""}`,
            }))}
          value={employees.map((id) => ({
            value: id,
            label: `${selectableUsers.find((u) => u._id === id)?.firstName} ${
              selectableUsers.find((u) => u._id === id)?.lastName
            }`,
          }))}
          onChange={(selected) => setEmployees(selected.map((s) => s.value))}
          styles={selectStyles}
        />

        <div className="form-actions">
          <button type="submit">{editingTeam ? "Update Team" : "Create Team"}</button>
          <button type="button" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      <hr />

      <div className="team-list">
        <h2>Teams</h2>
        {teams.length === 0 ? (
          <p>No teams available.</p>
        ) : (
          <table className="teams-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Leader</th>
                <th>Employees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>{team.leader ? `${team.leader.firstName} ${team.leader.lastName}` : "—"}</td>
                  <td>
                    {team.employees?.length > 0 ? (
                      <ul className="employee-list">
                        {team.employees.map((e) => (
                          <li key={e._id}>{e.firstName} {e.lastName}</li>
                        ))}
                      </ul>
                    ) : (
                      "No employees"
                    )}
                  </td>
                  <td>
                    <button onClick={() => startEdit(team)}>Edit</button>
                    <button onClick={() => confirmDeleteTeam(team._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {confirmDelete.open && (
        <ConfirmModal
          message="Are you sure you want to delete this team?"
          onConfirm={handleDelete}
          loading={deleting}
          onCancel={() => setConfirmDelete({ open: false, teamId: null })}
        />
      )}
    </div>
  );
};

export default LeaderTeamManager;
