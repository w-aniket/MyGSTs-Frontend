// Contact.jsx (Corporate Business Design)
import React from "react";
import "./Contact.css";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        {/* Left Section */}
        <div className="contact-left">
          <h2 className="business-title">Ganesh Wakchaure</h2>
          <p className="business-subtext">
            We’re here to help and answer any questions you may have.
          </p>

          <div className="business-block">
            <h4>Company</h4>
            <p>My GST Service</p>
          </div>

          <div className="business-block">
            <h4>Email</h4>
            <p>mygstsofficial@gmail.com</p>
          </div>

          <div className="business-block">
            <h4>Phone</h4>
            <p>+91 8830-0787-32</p>
            <p>+91 9356-4029-59</p>
          </div>

          <div className="business-block">
            <h4>Address</h4>
            <p>THITE WASTI SR. NO. 14/1 NEAR.</p>
            <p>THITE BUNGLOW KHARADI PUNE 411014</p>
          </div>

          <div className="business-block">
            <h4>Social Media</h4>
            <p>@mygsts.official</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <h2>Contact Us</h2>
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
              <input type="text" name="jobTitle" placeholder=" " />
              <label>Job Title</label>
            </div>

            <div className="input-group">
              <textarea name="message" rows="5" required placeholder=" "></textarea>
              <label>Your Message</label>
            </div>

            <button type="submit" className="business-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

