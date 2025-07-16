import React, { useState } from "react";
import FileUploader from "../../../Utils/FileUpload/FileUploader";
import { uploadToCloudinary } from "../../../Utils/FileUpload/fileUploadUtils";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeStatusUpdate = ({ requestId, latestStatus, myUpdates, onUpdateSuccess  }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  
  const [status, setStatus] = useState(latestStatus);
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {

    if (!comment.trim() && files.length === 0) {
      return toast.warn("Please enter a comment or upload a file.");
    }

    setSubmitting(true)
    try {
        const fileUrls = await Promise.all(files.map(uploadToCloudinary));
        const payload =  {
            status,
            comment,
            files: fileUrls.filter(Boolean),
        }

        await axios.post(`${apiUrl}/api/employee/status-update/${requestId}`, payload,{headers});

        toast.success("Status updated")
        setComment("")
        setFiles([])
        if (onUpdateSuccess) onUpdateSuccess();

        
    } catch (error) {
        console.error("Error in submitting", error);
        toast.error("Failed to submit update")
    } finally {
        setSubmitting(false)
    }
  };

  const handleDeleteUpdate = async (updateIndex) => {

  try {
    await axios.delete(`${apiUrl}/api/employee/status-update/${requestId}/${updateIndex}`, {
      headers,
    });

    toast.success("Update deleted successfully");
    if (onUpdateSuccess) onUpdateSuccess();

  } catch (err) {
    console.error("Error deleting update", err);
    toast.error("Failed to delete update");
  }
};


  return (
      <div className="employee-status-form">
      <h3>Update Task Status</h3>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <textarea
        placeholder="Add your comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <FileUploader files={files} setFiles={setFiles} />

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Update"}
      </button>

      {myUpdates.length > 0 && (
  <div className="my-employee-updates">
    <h4>Your Updates</h4>
    <ul>
      {myUpdates.map((u, idx) => (
        <li key={idx}>
          <p><strong>Status:</strong> {u.status}</p>
          {u.comment && <p><strong>Comment:</strong> {u.comment}</p>}
          {u.files?.length > 0 && (
            <ul>
              {u.files.map((file, fIdx) => (
                <li key={fIdx}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    View File {fIdx + 1}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="below">

          <p className="update-date">🕒 {new Date(u.date).toLocaleString()}</p>

          {/* ✅ Delete Button */}
          <button
            className="delete-btn"
            onClick={() => handleDeleteUpdate(idx)}
            >
            ❌
          </button>
            </div>

          <hr />
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default EmployeeStatusUpdate;
