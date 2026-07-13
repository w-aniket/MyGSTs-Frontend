import { useState } from "react";
import { submitCourseApplication } from "../../Utils/APIs/courseApi";
import "./CourseApplyModal.css";
import { downloadFile } from "../../Utils/downloadFile";

const CourseApplyModal = ({ type, courseId, courseName, courseSlug, brochureUrl, onClose, onSubmitted }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    comment: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.consent) {
      setError("Please accept the consent checkbox to continue.");
      return;
    }

    setSubmitting(true);
    try {
      await submitCourseApplication({
        ...form,
        course: courseId,
        type,
      });

      if (type === "brochure" && brochureUrl) {
        await downloadFile(brochureUrl, `${courseName || "brochure"}.pdf`);
      }

      onSubmitted(type);
      
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cam-overlay" onClick={onClose}>
      <div className="cam-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cam-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className="cam-title">
          {type === "apply" ? "Apply Now" : "Download Brochure"}
        </h2>
        <p className="cam-subtitle">{courseName}</p>

        <form onSubmit={handleSubmit} className="cam-form">
          <div className="cam-field">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cam-field">
            <label>Contact Number *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cam-field">
            <label>WhatsApp Number *</label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cam-field">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cam-field">
            <label>Comment (optional)</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <label className="cam-checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
            />
            <span>
              I agree to receive information regarding my submitted
              application, and informational and promotional messages, calls,
              and updates through SMS, Email, WhatsApp, and RCS by signing up.
            </span>
          </label>

          {error && <p className="cam-error">{error}</p>}

          <button type="submit" className="cam-submit" disabled={submitting}>
            {submitting ? "Submitting..." : type === "apply" ? "Submit Application" : "Download Brochure"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseApplyModal;