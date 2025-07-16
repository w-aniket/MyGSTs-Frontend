import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";
import FileUploader from "../../../Utils/FileUpload/FileUploader";
import { uploadToCloudinary } from "../../../Utils/FileUpload/fileUploadUtils";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );

      const validUrls = uploadedUrls.filter((url) => url && url.trim() !== "");

      const payload = {
        ...form,
        service: id,
        files: validUrls,
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
        <FileUploader files={files} setFiles={setFiles} />

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
