import React, { useState } from "react";
import { uploadClientFilesApi } from "../../Utils/APIs/serviceRequestApi";
import FileUploader from "../../Utils/FileUpload/FileUploader";
import { toast } from "react-toastify";

const ClientFileUploader = ({ requestId, onUpdated }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return toast.error("Select Files");
    setLoading(true);
    try {
      const res = await uploadClientFilesApi(requestId, files);
      setFiles([]);
      onUpdated();
      toast.success("File Uploaded successfully");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="client-file-upload">
      <h3>Upload Documents</h3>
      <FileUploader files={files} setFiles={setFiles} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading" : "Upload Documents"}
      </button>
    </div>
  );
};

export default ClientFileUploader;
