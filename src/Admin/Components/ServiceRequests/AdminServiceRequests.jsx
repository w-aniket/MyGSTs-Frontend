import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./AdminServiceRequests.css"
import { toast } from 'react-toastify'
import { downloadFile } from '../../../Utils/Download'
import Pagination from '../Pagination/Pagination'
import SearchFilter from '../SearchFilter/SearchFilter'

const AdminServiceRequests = () => {
    const [requests, setRequests] = useState([])
    const [assignTarget, setAssignTarget] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState("");

    const [filteredRequests, setFilteredRequests] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState('');
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);


    const [detailReq, setDetailReq] = useState(null)

    const apiUrl = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token');
    const authHeader = {headers: {Authorization: `Bearer ${token}`}};

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/service-requests`, authHeader)
            setRequests(res.data.requests);
        } catch (err) {
            console.error("Error fetching service requests", err)
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`${apiUrl}/api/service-requests/${id}/status`, { status: newStatus }, authHeader)
            setRequests((prev) => 
                prev.map((req) => (req._id === id ? {...req, status: newStatus} : req))
            )
        } catch (error) {
            console.error("Failed to update status", error)
        }
    }

    const openAssignModel = async (req) => {
        setAssignTarget(req);
        setSelectedEmp('');
        if (employees.length === 0) {
            try {
                const res = await axios.get(`${apiUrl}/api/user/employees`, authHeader);
                setEmployees(res.data.employees);
            } catch (err) {
                console.error('Failed to fetch employees', err)
            }
        }
    }

    const handleAssign = async () => {
        if (!selectedEmp) {
            toast.error("Select Employee!");
            return
        }

        try {
            const res = await axios.patch(`${apiUrl}/api/service-requests/${assignTarget._id}/assign`, {employeeId: selectedEmp}, authHeader);
            setRequests((prev) => 
                prev.map((r) => 
                    r._id === assignTarget._id ? {...r, ...res.data.request} : r
        ));
        setAssignTarget(null);
        } catch (err) {
            console.error("Failed to assign employee", err);
        }
    };

    useEffect(() => {
        fetchRequests()
    }, []);

    useEffect(() => {
  const filtered = requests.filter((req) =>
    (req.user?.firstName + " " + req.user?.lastName || "Guest")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (req.service?.title || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (req.status).toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredRequests(filtered);
  setCurrentPage(1); 
}, [searchTerm, requests]);

  return (
    <div className='admin-service-requests'>
        <h2 className='title'>Service Requests</h2>   
        <SearchFilter searchTerm={searchTerm} onSearch={setSearchTerm}/>
        <table className="request-table">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Assign</th>
                    <th>Data</th>

                </tr>
            </thead>
            <tbody>
                {currentItems.length === 0 ? (
                    <tr>
                        <td colSpan="8">No requests found</td>
                    </tr>
                ) : (
                    currentItems.map((req) => (
                        <tr key={req._id}>
                            <td>{req.user?.firstName || ""}{" "}{req.user?.lastName || "Guest"}</td>
                            <td>{req.service?.title || "N/A"}</td>
                            <td>
                                <select className={`status-select ${req.status.toLowerCase().replace(/\s/g, '-')}`} value={req.status} onChange={(e) => handleStatusChange(req._id, e.target.value)} >
                                    <option value="Pending">Pending</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </td>
                            <td>
                                {req.assignedTo ? (
                                    <span>{req.assignedTo.firstName ? `${req.assignedTo.firstName} ${req.assignedTo.lastName}` : 'Assigned'}
                                    </span>
                                    
                                ) : (
                                    <button className='assign-btn' onClick={() => openAssignModel(req)}>Assign</button>
                                )}
                            </td>
                            <td>
                                <button className='view-btn' onClick={() => setDetailReq(req)}>View</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
            </table>    
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {
                assignTarget && (
                    <div className="modal-overlay">
                        <div className="modal-box responsive">
                            <h3 className='modal-title'>Assign Employee</h3>
                            <p className='modal-service'>
                                <span>Service:</span>
                                <strong>{assignTarget.service.title || 'Untitled Service'}</strong>
                            </p>
                            <select 
                                className='modal-select'
                                value={selectedEmp}
                                onChange={(e) => setSelectedEmp(e.target.value)}
                            >
                                <option value="">Select employee</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.firstName} {emp.lastName} ({emp.email})
                                    </option>
                                ))}
                            </select>

                            <div className="modal-actions">
                                <button className='modal-btn' onClick={handleAssign}>
                                    Assign
                                </button>
                                <button className="modal-btn cancel"
                                    onClick={() => setAssignTarget(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            } 

            {detailReq && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3 className="modal-title">Request Detail</h3>
                        <p><strong>User (Login):</strong> {detailReq.user?.firstName || ''}{' '}{detailReq.user?.lastName}</p>
                        <p><strong>Name :</strong> {detailReq.name}</p>
                        <p><strong>Email:</strong> {detailReq.email}</p>
                        <p><strong>Phone:</strong> {detailReq.phone}</p>
                        <p><strong>Service:</strong> {detailReq.service?.title}</p>
                        <p><strong>Description:</strong> {detailReq.description}</p>
                        <p><strong>Requested At:</strong> {new Date(detailReq.createdAt).toLocaleString()}</p>
                        {detailReq.file && (
  <p className="attachment">
    <strong>Attachment:</strong>{' '}
    {(() => {
      // strip query string, lower‑case, then test for .pdf
      const isPdf = detailReq.file.split('?')[0].toLowerCase().includes("raw");
      const fileName = `request-${detailReq._id}.pdf`;

      if (isPdf) {
        return (
          <button
            className="download-btn"
            onClick={() => downloadFile(detailReq.file, fileName)}
          >
            Download PDF
          </button>
        );
      }

      // fallback for images / others
      return (
        <a href={detailReq.file} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      );
    })()}
  </p>
)}


                        <div className="modal-actions">
                            <button className='assign-btn' onClick={() => 
                                (   
                                    setDetailReq(null),
                                    openAssignModel(detailReq)
                                )
                            }>Assign</button>
                            
                            <button className="modal-btn cancel" onClick={()  =>setDetailReq(null)}>Close</button>
                        </div>

                    </div>
                </div>
            )}
    </div>
  )
}

export default AdminServiceRequests