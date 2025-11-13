import React from "react";
import "./FileUploader.css";

const FileUploader = ({ files, setFiles }) => {
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="image/*,application/pdf"
        multiple
        onChange={handleFileChange}
        className="uploader-input"
      />

      <div className="uploader-file-list">
        {files.map((file, index) => (
          <div key={index} className="uploader-file-item">
            <span className="uploader-file-name">{file.name}</span>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="uploader-remove-btn"
              title="Remove file"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
