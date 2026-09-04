import React, { useState } from "react";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaRegAddressBook,
  FaCommentDots,
} from "react-icons/fa";
import ChatPanel from "./ChatPanel.jsx";
import "./ContactWidget.css";

const ContactWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <section className="contact-widget" aria-label="Quick contact options">
        {/* Chat Assistant */}
        <button
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="icon chatBot"
          aria-label="Chat with our assistant"
          title="Chat with us"
        >
          <FaCommentDots />
          <span className="sr-only">Chat Assistant</span>
        </button>

        {/* Contact Page */}
        <a
          href="/contact"
          className="icon contactPage"
          aria-label="Contact us page"
          title="Contact Us"
        >
          <FaRegAddressBook />
          <span className="sr-only">Contact Us</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918830078732"
          target="_blank"
          rel="noopener noreferrer"
          className="icon whatsapp"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp Chat"
        >
          <FaWhatsapp />
          <span className="sr-only">WhatsApp</span>
        </a>

        {/* Phone */}
        <a
          href="tel:+918830078732"
          className="icon phone"
          aria-label="Call us"
          title="Call Us"
        >
          <FaPhone />
          <span className="sr-only">Call Us</span>
        </a>

        {/* Email */}
        <a
          href="mailto:mygstsofficial@gmail.com"
          className="icon email"
          aria-label="Email us"
          title="Email Us"
        >
          <FaEnvelope />
          <span className="sr-only">Email Us</span>
        </a>
      </section>
      {isChatOpen && <ChatPanel onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default ContactWidget;