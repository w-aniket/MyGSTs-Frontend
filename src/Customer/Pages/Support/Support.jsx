
import "./Support.css";
import { FAQ } from "../../../Component/FAQ/FAQ";
import { Link } from "react-router-dom";
import SupportTicket from "./SupportTicket/SupportTicket";

const Support = () => {
 
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

      <SupportTicket />

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
