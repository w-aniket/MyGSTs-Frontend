import React, { useEffect, useState } from "react";
import {
  deleteWorkFileApi,
  uploadWorkFilesApi,
} from "../../../Utils/APIs/serviceRequestApi";
import { toast } from "react-toastify";
import FileUploader from "../../../Utils/FileUpload/FileUploader";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import { downloadFile } from "../../../Utils/Download";
import "./WorkFilUpload.css"

const WorkFileUpload = ({ request, onUpdated }) => {
  const [files, setFiles] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // delete confirm

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleUpload = async () => {
    if (files.length === 0) return alert("Select files");
    setLoading(true);
    try {
      const res = await uploadWorkFilesApi(request._id, files, note);
      setFiles([]);
      setNote("");
      onUpdated();
      toast.success("Work files uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModalModal = (publicId) => {
    setDeleteId(publicId);
    setShowConfirm(true)
  }

  const confirmDelete = async () => {
    setLoading(true)
    try {
      await deleteWorkFileApi(deleteId);
      onUpdated();
      toast.success("File Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
    setLoading(false)
    setShowConfirm(false);
    setDeleteId(null)
  };

  const cancleDelete = () => {
    setShowConfirm(false);
    setDeleteId(null)
  }

  return (
    <div className="work-file-upload">
      <h2 className="section-title">Work Files</h2>

      <div className="form-group">
        <label htmlFor="">Select Files</label>
        <FileUploader files={files} setFiles={setFiles} />
      </div>

      <div className="form-group">
        <label htmlFor="">Note (Optional)</label>
        <textarea
          placeholder="Add a note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="btn-area">
        <button
          disabled={loading}
          className="btn-primary"
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="work-files-list">
        <h4>Uploaded Files</h4>
        {request.workFiles?.length === 0 ? (
          <div>No files yet</div>
        ) : (
          <ul>
            {request.workFiles.map((f, idx) => {
              const url = f.url;
              const isPdf =
                /\.pdf(\?|$)/i.test(url) || /\/raw\/upload\//i.test(url);
              const label = isPdf
                ? `PDF ${idx + 1}`
                : `Image ${idx + 1}`;

              const onClick = () =>
                isPdf
                  ? downloadFile(url, `File-${f.public_id}-${idx + 1}.pdf`)
                  : window.open(url, "_blank", "noopener");

              return (
                <li key={f.public_id}>
                  <button
                    type="button"
                    className="download-btn"
                    onClick={onClick}
                  >
                    {label}
                  </button>
                  <small>
                    {" "}
                    by {f.uploadedBy?.firstName || "Unknown"} on{" "}
                    {new Date(f.uploadedAt).toLocaleString()}
                  </small>
                  <button
                    onClick={() =>
                      openDeleteModalModal(encodeURIComponent(f.public_id))
                    }
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this file?"
          loading={loading}
          onConfirm={confirmDelete}
          onCancel={cancleDelete}
        />
      )}
    </div>
  );
};

export default WorkFileUpload;
