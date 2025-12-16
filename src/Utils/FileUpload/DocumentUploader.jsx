import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaFilePdf, FaTrash } from "react-icons/fa";
import "./DocumentUploader.css";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const DocumentUploader = ({ label, file, onChange }) => {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: MAX_FILE_SIZE,

    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach(({ errors }) => {
          errors.forEach((err) => {
            if (err.code === "file-too-large") {
              toast.error("File size must be less than 2 MB");
            } else if (err.code === "file-invalid-type") {
              toast.error("Only PDF, JPG, or JPEG files are allowed");
            } else {
              toast.error(err.message);
            }
          });
        });
        return;
      }

      const file = acceptedFiles[0];

      const allowedTypes = ["application/pdf", "image/jpeg"];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file format");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 2 MB");
        return;
      }

      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
  });

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview("pdf");
    }
  }, [file]);

  return (
    <div className="doc-upload-card">
      {!file ? (
        <div {...getRootProps()} className="doc-dropzone">
          <input {...getInputProps()} />
          <p>Upload {label}</p>
          <span>PDF / Image (Max 2 MB)</span>
        </div>
      ) : (
        <div className="doc-file-preview">
          {preview === "pdf" ? (
            <FaFilePdf size={32} />
          ) : (
            <img src={preview} alt="preview" />
          )}

          <span className="doc-file-name">{file.name}</span>

          <button
            type="button"
            onClick={() => onChange(null)}
            className="doc-remove-btn"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
