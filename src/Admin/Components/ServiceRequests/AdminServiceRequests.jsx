import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./AdminServiceRequests.css"

const AdminServiceRequests = () => {
    const [requests, setRequests] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(`${apiUrl}/api/service-requests`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            setRequests(res.data.requests);
        } catch (error) {
            console.error("Error fetching service requests", error)
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`${apiUrl}/api/service-requests/${id}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}`}
            })
            setRequests((prev) => 
                prev.map((req) => (req._id === id ? {...req, status: newStatus} : req))
            )
        } catch (error) {
            console.error("Failed to update status", error)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, []);
  return (
    <div className='admin-service-requests'>
        <h2 className='title'>Service Requests</h2>   
        <table className="request-table">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Service</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Requested At</th>
                </tr>
            </thead>
            <tbody>
                {requests.length === 0 ? (
                    <tr>
                        <td colSpan="7">No requests found</td>
                    </tr>
                ) : (
                    requests.map((req) => (
                        <tr key={req._id}>
                            <td>{req.name || "Guest"}</td>
                            <td>{req.service?.title || "N/A"}</td>
                            <td>{req.email}</td>
                            <td>{req.phone}</td>
                            <td>{req.description}</td>
                            <td>
                                <select className='status-select' value={req.status} onChange={(e) => handleStatusChange(req._id, e.target.value)} >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </td>
                            <td>{new Date(req.createdAt).toLocaleString()}</td>
                        </tr>
                    ))
                )}
            </tbody>
            </table>     
    </div>
  )
}

export default AdminServiceRequests