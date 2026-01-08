import axios from "axios";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import DocumentUploader from "../../../../Utils/FileUpload/DocumentUploader";

const ClientUploadSection = ({ request }) => {
  const [pendingFiles, setPendingFiles] = useState({});
  const [uploadingDocs, setUploadingDocs] = useState(null);
  const [localUploadedDocs, setLocalUploadedDocs] = useState([]);

  // Map uploaded documents for quick lookup
  const uploadedDocsMap = useMemo(() => {
    const combined = [...(request.files || []), ...localUploadedDocs];
    return new Map(combined.map((f) => [f.documentName, f]));
  }, [request.files, localUploadedDocs]);

  const handleFileChange = (documentName, file) => {
    setPendingFiles((prev) => ({
      ...prev,
      [documentName]: file,
    }));
  };

  const handleUpload = async (documentName) => {
    const file = pendingFiles[documentName];
    if (!file) return;

    try {
      setUploadingDocs(documentName);
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("documentName", documentName);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests/${
          request._id
        }/upload-document`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLocalUploadedDocs((prev) => [
        ...prev,
        {
          documentName,
          url: res.data.file.url,
          mimeType: res.data.file.mimeType,
        },
      ]);
      toast.success(`${documentName} uploaded successfully`);
      setPendingFiles((prev) => {
        const copy = { ...prev };
        delete copy[documentName];
        return copy;
      });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to upload ${documentName}`);
    } finally {
      setUploadingDocs(null);
    }
  };

  return (
    <div className="srd-section">
      <h2 className="srd-section-title">Client Uploaded Documents</h2>

      <div className="srd-card">
        {request?.service?.documents &&
        request?.service?.documents?.length > 0 ? (
          <div className="srd-file-list">
            {request.service.documents.map((docName) => {
              const uploadedFile = uploadedDocsMap.get(docName);
              const pendingFile = pendingFiles[docName];

              return (
                <div className="srd-file-item" key={docName}>
                  <div className="srd-file-info">
                    <span className="srd-file-name">{docName}</span>

                    {uploadedFile ? (
                      <>
                        <span className="srd-file-type">
                          {uploadedFile.mimeType?.toUpperCase()}
                        </span>
                      </>
                    ) : (
                      <span className="srd-file-pending">Not Uploaded</span>
                    )}
                  </div>

                  {uploadedFile ? (
                    <a
                      href={uploadedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="srd-file-action"
                    >
                      View / Download
                    </a>
                  ) : (
                    <>
                      <DocumentUploader
                        label={docName}
                        file={pendingFile || null}
                        onChange={(file) => handleFileChange(docName, file)}
                      />

                      {pendingFile && (
                        <button
                          className="srd-upload-btn"
                          onClick={() => handleUpload(docName)}
                          disabled={uploadingDocs === docName}
                        >
                          {uploadingDocs === docName
                            ? "Uploading..."
                            : "Upload"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="srd-empty-text">No document requirements defined.</p>
        )}
      </div>
    </div>
  );
};

export default ClientUploadSection;
