import React from "react";
import "./ContactForm.css";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await axios.post(`${apiUrl}/api/contact`, data);
      toast.success("Your message has been sent successfully.");
      event.target.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        {/* Left Section */}
        <div className="contact-left">
          <h1 className="business-title">Contact MyGSTs</h1>

          <p className="business-subtext">
            We’re here to help and answer any questions you may have regarding
            GST, ITR, and business compliance services.
          </p>

          <div className="business-block">
            <h4>
              <FaBuilding style={{ marginRight: "8px" }} />
              Company
            </h4>
            <p>MyGSTs</p>
          </div>

          <div className="business-block">
            <h4>
              <FaEnvelope style={{ marginRight: "8px" }} />
              Email
            </h4>
            <p>mygstsofficial@gmail.com</p>
          </div>

          <div className="business-block">
            <h4>
              <FaPhone style={{ marginRight: "8px" }} />
              Phone
            </h4>
            <p>+91 8830 0787 32</p>
            <p>+91 9356 4029 59</p>
          </div>

          <div className="business-block">
            <h4>
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              Address
            </h4>
            <p>Thite Wasti, Sr. No. 14/1, Near Thite Bunglow</p>
            <p>Kharadi, Pune – 411014</p>
          </div>

          <div className="business-block">
            <h4>
              <FaInstagram style={{ marginRight: "8px" }} />
              Social Media
            </h4>
            <p>@mygsts.official</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="name" required placeholder=" " />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input type="email" name="email" required placeholder=" " />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input type="tel" name="contact" required placeholder=" " />
              <label>Contact Number</label>
            </div>

            <div className="input-group">
              <input type="text" name="subject" placeholder=" " />
              <label>Subject</label>
            </div>

            <div className="input-group">
              <textarea
                name="message"
                rows="3"
                required
                placeholder=" "
              ></textarea>
              <label>Your Message</label>
            </div>

            <button type="submit" className="business-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
