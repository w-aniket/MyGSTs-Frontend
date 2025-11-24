import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assignTeamApi } from "../../../Utils/APIs/serviceRequestApi";

const AssignTeam = ({ request, onUpdated }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(request.team?._id || "");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTeam = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/teams`, authHeader);
      setTeams(res.data?.teams || []);
    } catch (error) {
      console.error("Failed to load team", err);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleAssign = async () => {
    if (!selectedTeam) {
      toast.error("Please select a team");
      return;
    }

    try {
      setLoading(true);
      await assignTeamApi(request._id, { teamId: selectedTeam, note });
      toast.success("Team assigned successfully");
      onUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-team card">
      <h2>Assign Team</h2>

      <label htmlFor="">Select Team:</label>
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">Select</option>
        {teams.map((team) => (
            <option key={team._id} value={team._id}>
                {team.name}
            </option>
        ))}
      </select>

      <label htmlFor="">Note (optional):</label>
      <textarea 
        value={note}
        onChange={(e)=> setNote(e.target.value)}
        placeholder="Add a note for the team (optional)"
      />

      <button disabled={loading} onClick={handleAssign} className="btn-primary">
        {loading ? "Saving..." : "Assign Team"}
      </button>
    </div>
  );
};

export default AssignTeam;
