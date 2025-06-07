import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";

const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD);

  const uniqueId = `file_${Date.now()}`;
  const blob = new Blob([file], { type: file.type });
  data.append("file", blob, uniqueId);
  data.append("public_id", uniqueId);

  let uploadUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD
  }/auto/upload`;
  if (file.type === "application/pdf") {
    uploadUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD
    }/raw/upload`;
  }

  const res = await axios.post(uploadUrl, data);
  return res.data.secure_url;
};

const ServiceRequestForm = () => {
  const { id } = useParams(); // service ID from URL
  const user = useContext(UserContext); // get logged-in user (if any)

  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    companyName: "",
    file: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setForm((prev) => ({ ...prev, file }));
      if (file) {
        try {
          setUploading(true);
          const url = await uploadToCloudinary(file);
          setFileUrl(url);
        } catch (err) {
          console.error("File upload failed", err);
          alert("Failed to upload file. Please try again.");
        } finally {
          setUploading(false);
        }
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let uploadedFileUrl = "";

      if (form.file) {
        uploadedFileUrl = await uploadToCloudinary(form.file);
      }

      const payload = {
        service: id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        description: form.description,
        companyName: form.companyName,
        file: fileUrl,
      };

      if (user.user?._id) {
        payload.user = user.user._id;
      }

      console.log(payload)

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests`,
        payload
      );

      alert("Request submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        description: "",
        companyName: "",
        file: null,
      });
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
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="form-input"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="form-input"
        />
        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="form-input"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your requirement"
          required
          className="form-textarea"
        />
        <input
          name="file"
          type="file"
          onChange={handleChange}
          className="form-file"
        />
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
