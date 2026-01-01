import React, { useState } from "react";
import "./Support.css";
import { FAQ } from "../../../Component/FAQ/FAQ";
import { Link } from "react-router-dom";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
    file: null,
  });

  const [status, setStatus] = useState(""); // success/error messages

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, we will just simulate submission
    console.log("Support Ticket Submitted:", formData);
    setStatus(
      "Your support request has been submitted. We will respond within 24 hours."
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      category: "",
      message: "",
      file: null,
    });
  };
  return (
    <div className="support-container">
      <section className="support-header">
        <div className="support-header-content">
          <h1>Support Center</h1>
          <p className="support-subtitle">
            Need help? Our team is here to assist you with service, tracking,
            payments, and refunds etc.
          </p>

          <p className="support-meta">
            ⏱ Response time: <strong>Within 24 hours</strong>
          </p>
        </div>
      </section>

      <FAQ />

      <section className="support-ticket-section">
        <h2>Submit a Support Ticket</h2>
        <p>
          Fill out the form below and our team will get back to you within 24
          hours.
        </p>

        <form className="support-ticket-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Issue Category</option>
            <option value="service_request">Service Request</option>
            <option value="payment">Payment</option>
            <option value="document_upload">Document Upload</option>
            <option value="other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="file"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />

          <button type="submit">Submit Ticket</button>

          {status && <p className="status-message">{status}</p>}
        </form>
      </section>

        <section className="contact-support-section">
      <h2>Contact Support</h2>
      <p>
        For urgent issues or direct help, reach out to our support team through the following methods:
      </p>

      <ul className="contact-list">
        <li>
          📧 Email:{" "}
          <a href="mailto:support@mygsts.com" className="contact-link">
            mygsts@gmail.com
          </a>
        </li>
        <li>
          📞 Phone / WhatsApp:{" "}
          <a href="tel:+918830078732" className="contact-link">
            +91 8830078732
          </a>
        </li>
        <li>
          ⏰ Support Hours: Mon – Sat, 10 AM – 6 PM
        </li>
      </ul>
    </section>

     <footer className="support-footer-links">
      <h3>Helpful Links</h3>
      <ul>
        <li>
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        </li>
        <li>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/refund-policy" className="footer-link">Refund Policy</Link>
        </li>
        <li>
          <Link to="/contact" className="footer-link">Contact Page</Link>
        </li>
      </ul>
    </footer>
    </div>
  );
};

export default Support;
