import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./LeaderTeamManager.css"; // Assuming you have some styles for this component

import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";

const LeaderTEamManager = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [name, setName] = useState("");
  const [leader, setLeader] = useState("");
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  // const [selectTeamId, setSelectTeamId] = useState(null);
  // const [selectedMembers, setSelectedMembers] = useState([]);
  // const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchTeams();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/users`, { headers });
      setUsers(res.data.users);
    } catch (error) {
      toast.error("Error fetching users:");
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/teams`, { headers });
      setTeams(res.data.teams || []);
    } catch (error) {
      toast.error("Error fetching teams:");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!teamName || !leaderId) {
    //   toast.error("Please fill in all fields");
    //   return;
    // }

    // const teamExists = teams.some(
    //   (team) => team.name?.toLowerCase() === teamName.toLowerCase()
    // );
    // if (teamExists) {
    //   toast.error("Team with this name already exists");
    //   return;
    // }

    // const alreadyLeader = teams.some((team) => team.leader?._id === leaderId);
    // if (alreadyLeader) {
    //   toast.error("This user is already a team leader");
    //   return;
    // }

    try {
      const res = await axios.post(
        `${apiUrl}/api/teams`,
        {
          name,
          leader,
          employees,
        },
        { headers }
      );
      toast.success("Team created successfully");
      setName("");
      setLeader("");
      setEmployees([]);
      fetchTeams();
    } catch (error) {
      console.error("Error creating team", error);
      toast.error(error.response?.data?.message || "Error creating team:");
    }
  };

  // const handleMemberToggle = (userId) => {
  //   if (selectedMembers.includes(userId)) {
  //     setSelectedMembers(selectedMembers.filter((id) => id !== userId));
  //   } else {
  //     const alreadyAssigned = teams.some((t) =>
  //       t.members?.some((m) => m._id === userId)
  //     );
  //     if (alreadyAssigned) {
  //       toast.warn("This member is already assigned to a team");
  //     } else {
  //       setSelectedMembers([...selectedMembers, userId]);
  //     }
  //   }
  // };

  // const handleUpdateMembers = async (teamId) => {
  //   try {
  //     await axios.put(
  //       `${apiUrl}/api/teams/${teamId}/members`,
  //       { members: selectedMembers },
  //       { headers }
  //     );
  //     toast.success("Team members updated");
  //     setSelectedMembers([]);
  //     fetchTeams();
  //     setSelectTeamId(null);
  //   } catch (error) {
  //     console.error("Error updating team members:", error);
  //     toast.error(
  //       error.response?.data?.message || "Error updating team members"
  //     );
  //   }
  // };

  // const handleDeleteTeam = async (teamId) => {
  //   try {
  //     await axios.delete(`${apiUrl}/api/teams/${teamId}`, { headers });
  //     toast.success("Team deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting team:", error);
  //     toast.error(error.response?.data?.message || "Error deleting team");
  //   } finally {
  //     fetchTeams();
  //   }
  // };

  return (
    <div className="leader-team-manager">
      <h2>Create Team</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Team Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="">Leader</label>
        <select
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
          required
        >
          <option value="">Select Leader</option>
          {users
            .filter((u) => u.role === "leader" || u.role === "admin")
            .map((u) => (
              <option key={u._id} value={u._id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
        </select>

        <label>Employees</label>
        <select
          multiple
          value={employees}
          onChange={(e) =>
            setEmployees([...e.target.selectedOptions].map((o) => o.value))
          }
        >
          {users
            .filter((u) => u.role === "employee")
            .map((u) => (
              <option value={u._id} key={u._id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
        </select>
        <button type="submit">Create Team</button>
      </form>

      <hr />

      <div className="team-list">
        <h2>Teams</h2>
        {teams.length === 0 ? (
          <p>No teams available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Leader</th>
                <th>Employees</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>{team.leader ? `${team.leader?.firstName} ${team.leader?.lastName}` : ``}</td>
                  <td>
                    {team.employees?.map((e) => `${e.firstName} ${e.lastName}`).join(", ") || "No employees"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this team?"
          onConfirm={() => {
            handleDeleteTeam(showModal);
            setShowModal(null);
          }}
          onCancel={() => setShowModal(false)}
        />
      )} */}
    </div>
  );
};

export default LeaderTEamManager;
