// FileUploader.jsx
import React from "react";

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
    <div className="file-uploader">
      <input
        type="file"
        accept="image/*,application/pdf"
        multiple
        onChange={handleFileChange}
        className="form-file"
      />
      <div className="file-preview-list">
        {files.map((file, index) => (
          <div key={index} className="file-preview-item">
            <span className="file-name">{file.name}</span>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="remove-button"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
