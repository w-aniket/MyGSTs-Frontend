import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./DocumentUploader.css";

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

      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        onChange(selectedFile);
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
    }

    setPreview("pdf");
  }, [file]);

  return (
    <div className="doc-upload-card">
      {!file ? (
        <div {...getRootProps()} className="doc-dropzone">
          <input {...getInputProps()} />
          <p>Upload {label}</p>
          <span>PDF / JPG / JPEG (Max 2 MB)</span>
        </div>
      ) : (
        <div className="doc-file-preview">
          {preview === "pdf" ? (
            <FaFilePdf size={40} />
          ) : (
            <img src={preview} alt="Preview" />
          )}

          <span className="doc-file-name">{file.name}</span>

          <button
            type="button"
            className="doc-remove-btn"
            onClick={() => onChange(null)}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
