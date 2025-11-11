import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchFilter from "../SearchFilter/SearchFilter";
import Pagination from "../Pagination/Pagination";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";

const apiUrl = import.meta.env.VITE_API_URL;

const RoleManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoleChange, setSelectedRoleChange] = useState(null); // { userId, newRole }

  const usersPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setUsers(res.data.users);
      } else {
        console.error("Failed to fetch users:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const initiateRoleChange = (userId, newRole) => {
    setSelectedRoleChange({ userId, newRole });
    setShowModal(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedRoleChange) return;

    const { userId, newRole } = selectedRoleChange;
    try {
      setUpdating(userId);
      const res =await axios.put(
        `${apiUrl}/api/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("Role updated successfully!");
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error(error.response?.data?.message || "Error updating role.");
    } finally {
      setUpdating(null);
      setShowModal(false);
      setSelectedRoleChange(null);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="role-manager">
      <h2>Manage User Roles</h2>
      <SearchFilter searchTerm={searchTerm} onSearch={setSearchTerm} />
      <table className="role-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>
                <select
                  name=""
                  id=""
                  value={user.role}
                  onChange={(e) => initiateRoleChange(user._id, e.target.value)}
                  disabled={updating === user._id}
                >
                  <option value="user">User</option>
                  <option value="employee">Employee</option>
                  <option value="leader">Leader</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
{      showModal && (

      <ConfirmModal
        message="Are you sure you want to change the role?"
        onConfirm={confirmRoleChange}
        onCancel={() => {
          setShowModal(false)
          setSelectedRoleChange(null);}}
      />
)}
    </div>
  );
};

export default RoleManager;
