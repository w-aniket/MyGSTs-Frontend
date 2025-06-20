import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";

const uploadToCloudinary = async (file) => {
  const data = new FormData();
  const uniqueId = `file_${Date.now()}`;
  data.append("file", new Blob([file], { type: file.type }), uniqueId);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD);
  data.append("public_id", uniqueId);

  const uploadUrl =
    file.type === "application/pdf"
      ? `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD
        }/raw/upload`
      : `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD
        }/auto/upload`;

  const res = await axios.post(uploadUrl, data);
  return res.data.secure_url;
};

const ServiceRequestForm = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    companyName: "",
  });

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        selectedFiles.map((file) => uploadToCloudinary(file))
      );
      setFileUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error("File upload failed", err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.fileter((_, i) => i !== index));
    setFileUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        service: id,
        files: fileUrls,
        user: user?._id || null,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests`,
        payload
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        description: "",
        companyName: "",
      });
      setFiles([]);
      setFileUrls([]);
      navigate("/my-service-requests");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="service-request-container">
      <h2 className="form-title">Request This Service</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <input
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
          className="form-input"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
          className="form-input"
        />
        <input
          name="companyName"
          value={form.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
          className="form-input"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Describe your requirement"
          required
          className="form-textarea"
        />
        <label className="form-label">Upload Documents (PDF or Image)</label>
        <input
          name="file"
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

        <button
          type="submit"
          disabled={submitting || uploading}
          className="form-button"
        >
          {submitting
            ? "Submitting..."
            : uploading
            ? "Uploading File..."
            : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
