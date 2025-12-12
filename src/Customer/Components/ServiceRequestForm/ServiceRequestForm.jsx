import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";
import FileUploader from "../../../Utils/FileUpload/FileUploader";
import { toast } from "react-toastify";
import "./ServiceRequestForm.css";

const ServiceRequestForm = ({ pricing }) => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(pricing)
  const [form, setForm] = useState({
    name: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "",
    email: user?.email || "",
    phone: user?.phone || "",
    companyName: "",
    description: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone: user.phone || "",
        companyName: "",
        description: "",
      });
    }
  }, [user]);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // logged in user

    if (user) return handleLoggedInSubmit();

    // Not logged in

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests/send-otp`,
        {
          email: form.email,
        }
      );

      if (res.data.success) {
        toast.success("OTP sent to your email");
        setOtpStep(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpVerification = async () => {
    try {
      setSubmitting(true);
      setUploading(true);

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("service", id);
      formData.append("otp", otp);
      formData.append("amount", pricing);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests/verify-otp`,
        formData
      );

      if (res.data.success) {
        toast.success("Request submitted successfully!");

        // save login token and user in context/localStorage
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        navigate("/my-service-requests");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "OTP verification fail");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const handleLoggedInSubmit = async () => {
    try {
      setSubmitting(true);
      setUploading(true);

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("service", id);
      formData.append("amount", pricing);

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Service request submitted successfully!");
      navigate("/my-service-requests");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit service request");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="service-request-container">

      {!otpStep ? (
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
            readOnly={!!user?.email}
            style={
              !!user?.email
                ? { backgroundColor: "#f3f3f3", cursor: "not-allowed" }
                : {}
            }
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
          <label className="form-label">Upload Documents (PDF or Image)</label>
          <FileUploader files={files} setFiles={setFiles} />
        </form>
      ) : (
        <div className="otp-verification-container">
          <h3>Verify Your Email</h3>
          <p>Enter the OTP sent to {form.email}</p>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="form-input"
          />
          <button
            onClick={handleOtpVerification}
            disabled={submitting || otp.length < 6}
            className="form-button"
          >
            {submitting ? "Verifying..." : "Verify & Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestForm;
