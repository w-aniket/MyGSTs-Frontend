import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";
import { toast } from "react-toastify";
import "./ServiceRequestForm.css";
import DocumentUploader from "../../../Utils/FileUpload/DocumentUploader";

const ServiceRequestForm = ({
  pricing,
  serviceName,
  requiredDocuments = [],
}) => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [gstEnabled, setGstEnabled] = useState(false);
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/settings`)
      .then((res) => setGstEnabled(res.data.settings.gstEnabled))
      .catch(() => {}); // fail silently, defaults to GST-off display
  }, []);

  const displayTotal = gstEnabled
    ? Math.round((pricing || 0) * 1.18)
    : pricing || 0;

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
      Object.entries(files).forEach(([docName, file]) => {
        if (file) {
          formData.append("files", file);
          formData.append("documentNames", docName);
        }
      });

      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("service", id);
      formData.append("otp", otp);
      formData.append("amount", pricing || 0);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests/verify-otp`,
        formData
      );

      if (res.data.success) {
        toast.success("Request submitted");

        // save login token and user in context/localStorage
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        // NOTE: requires the verify-otp backend controller to return
        // `invoice` in its response, the same way createServiceRequest does.
        // If it doesn't yet, this will show ₹0 on the confirmation page —
        // check that controller next.
        navigate(`/service-requests/confirmation/${res.data?.request.displayId}`, {
          state: {
            serviceName,
            invoice: res.data.invoice,
          },
        });
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

  const handleDocumentChange = (docName, file) => {
    setFiles((prev) => ({
      ...prev,
      [docName]: file,
    }));
  };

  const handleLoggedInSubmit = async () => {
    try {
      setSubmitting(true);
      setUploading(true);

      const formData = new FormData();
      Object.entries(files).forEach(([docName, file]) => {
        if (file) {
          formData.append("files", file);
          formData.append("documentNames", docName);
        }
      });

      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("service", id);
      formData.append("amount", pricing);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service-requests`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Request submitted");
      navigate(`/service-requests/confirmation/${res.data?.request.displayId}`, {
        state: {
          serviceName,
          invoice: res.data.invoice,
        },
      });
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

          <label className="form-label">Upload Documents</label>
          {requiredDocuments.map((doc, index) => (
            <DocumentUploader
              key={index}
              label={doc}
              file={files[doc]}
              onChange={(file) => handleDocumentChange(doc, file)}
            />
          ))}

          {pricing != null && (
            <div className="form-price-summary">
              <span>Total Payable</span>
              <strong>
                ₹ {displayTotal}
                {gstEnabled ? " (incl. 18% GST)" : ""}
              </strong>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || uploading}
            className="form-button"
          >
            {submitting || uploading ? "Please wait..." : "Submit Request"}
          </button>
        </form>
      ) : (
        <div className="otp-verification-container">
          <h3>Verify Your Email</h3>
          <p>Enter the OTP sent to {form.email}</p>
          <input
            type="text"
            maxLength="6"
            inputMode="numeric"
            pattern="[0-9]*"
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