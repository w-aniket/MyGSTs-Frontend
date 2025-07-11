import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./LeaderTeamManager.css"; // Assuming you have some styles for this component
import { use } from "react";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";

const LeaderTEamManager = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [selectTeamId, setSelectTeamId] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showModal, setShowModal] = useState(null);

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
      setTeams(res.data.teams);
    } catch (error) {
      toast.error("Error fetching teams:");
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName || !leaderId) {
      toast.error("Please fill in all fields");
      return;
    }

    const teamExists = teams.some(
      (team) => team.name?.toLowerCase() === teamName.toLowerCase()
    );
    if (teamExists) {
      toast.error("Team with this name already exists");
      return;
    }

    const alreadyLeader = teams.some((team) => team.leader?._id === leaderId);
    if (alreadyLeader) {
      toast.error("This user is already a team leader");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/api/teams`,
        {
          name: teamName,
          leader: leaderId,
        },
        { headers }
      );
      toast.success("Team created successfully");
      setTeamName("");
      setLeaderId("");
      fetchTeams();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating team:");
    }
  };

  const handleMemberToggle = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    } else {
      const alreadyAssigned = teams.some((t) =>
        t.members?.some((m) => m._id === userId)
      );
      if (alreadyAssigned) {
        toast.warn("This member is already assigned to a team");
      } else {
        setSelectedMembers([...selectedMembers, userId]);
      }
    }
  };

  const handleUpdateMembers = async (teamId) => {
    try {
      await axios.put(
        `${apiUrl}/api/teams/${teamId}/members`,
        { members: selectedMembers },
        { headers }
      );
      toast.success("Team members updated");
      setSelectedMembers([]);
      fetchTeams();
      setSelectTeamId(null);
    } catch (error) {
      console.error("Error updating team members:", error);
      toast.error(
        error.response?.data?.message || "Error updating team members"
      );
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`${apiUrl}/api/teams/${teamId}`, { headers });
      toast.success("Team deleted successfully");
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error(error.response?.data?.message || "Error deleting team");
    } finally {
      fetchTeams();
    }
  };

  return (
    <div className="leader-team-manager">
      <h2>Create Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <select value={leaderId} onChange={(e) => setLeaderId(e.target.value)}>
        <option value="">Select Leader</option>
        {users
          .filter((u) => u.role === "leader")
          .map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
      </select>
      <button onClick={handleCreateTeam}>Create</button>

      <hr />

      <h2>Manage Teams</h2>
      {teams.length === 0 ? (
        <p>No teams available. Please create a team.</p>
      ) : (
        teams.map((team) => (
          <div className="team-card" key={team._id}>
            <h4>{team.name}</h4>
            <p>
              Leader: {team.leader?.firstName} {team.leader?.lastName}
            </p>

            <label>Members:</label>
            <ul>
              {team.members?.map((m) => (
                <li key={m._id}>
                  {m.firstName} {m.lastName} ({m.email})
                </li>
              ))}
            </ul>

            {selectTeamId === team._id ? (
              <>
                <div className="checkbox-list">
                  {users
                    .filter((u) => u.role === "employee")
                    .map((user) => (
                      <label key={user._id}>
                        <input
                          type="checkbox"
                          value={user._id}
                          checked={selectedMembers.includes(user._id)}
                          onChange={() => handleMemberToggle(user._id)}
                        />
                        {user.firstName} {user.lastName} ({user.email})
                      </label>
                    ))}
                </div>
                <button onClick={() => handleUpdateMembers(team._id)}>
                  Save Member
                </button>
                <button onClick={() => setSelectTeamId(null)}>Cancel</button>
              </>
            ) : (
              <button
                onClick={() => {
                  setSelectTeamId(team._id);
                  setSelectedMembers(team.members?.map((m) => m._id) || []);
                }}
              >
                Edit Members
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => setShowModal(team._id)}
            >
              Delete Team
            </button>
            <hr />
          </div>
        ))
      )}

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this team?"
          onConfirm={() => {
            handleDeleteTeam(showModal);
            setShowModal(null);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LeaderTEamManager;
