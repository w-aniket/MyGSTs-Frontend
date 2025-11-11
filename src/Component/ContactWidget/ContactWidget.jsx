import React from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaRegAddressBook } from "react-icons/fa";
import "./ContactWidget.css";

const ContactWidget = () => {
  return (
    <div>
      <div className="contact-widget">

        {/* Contact Page Icon */}
        <a href="/contact" className="icon contactPage">
          <FaRegAddressBook />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/+918830078732"
          target="_blank"
          rel="noopener noreferrer"
          className="icon whatsapp"
        >
          <FaWhatsapp />
        </a>

        {/* Phone */}
        <a href="tel:+918830078732" className="icon phone">
          <FaPhone />
        </a>

        {/* Email */}
        <a href="mailto:mygstsofficial@gmail.com" className="icon email">
          <FaEnvelope />
        </a>

      </div>
    </div>
  );
};

export default ContactWidget;
