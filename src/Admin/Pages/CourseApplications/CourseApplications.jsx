import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllCourseApplications,
  exportCourseApplications,
} from "../../../Utils/APIs/courseApplicationApi";
import "./CourseApplications.css";

const CourseApplications = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const data = await getAllCourseApplications();
      setList(data);
    } catch (error) {
      console.error("Failed to load course applications", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportCourseApplications();
    } catch (error) {
      toast.error("Failed to export Excel file");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="page">
      <div className="ca-header">
        <h2>Course Applications</h2>
        <button className="ca-export-btn" onClick={handleExport} disabled={exporting}>
          {exporting ? "Exporting..." : "Export to Excel"}
        </button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {!loading && list.length === 0 && (
        <p className="empty-text">No course applications found.</p>
      )}

      {!loading && list.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Type</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr
                key={item._id}
                onClick={() => navigate(`/admin/course-application/${item._id}`)}
                className={`clickable-row ${!item.read ? "unread-row" : ""}`}
              >
                <td>{item.name}</td>
                <td>{item.course?.name || "-"}</td>
                <td>
                  <span className={`ca-type-badge ${item.type}`}>
                    {item.type === "apply" ? "Apply" : "Brochure"}
                  </span>
                </td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseApplications;