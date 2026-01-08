import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [services, setServices] = React.useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchServices  = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/services`);
        setServices(response.data.services);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    }
    fetchServices();
  } , []);

  return (
    <footer className="premium-footer">
      <div className="footer-wrapper">
        {/* Brand Section */}
        <div className="footer-col brand">
          <h3 className="brand-name">MyGSTs</h3>
          <h5 className="brand-name">
            Smart Accounting & Tax Solutions Built for Growing Indian Businesses
          </h5>
          <p className="brand-desc">
            Professional online accounting, GST, and income tax services
            designed for startups, professionals, and businesses across India.
            From compliance to audits, MyGSTs delivers fast, accurate, and
            reliable solutions—fully remote, fully secure.
          </p>

          <div className="trust">
            <FaShieldAlt />
            <span>Trusted Accounting & Tax Services in India</span>
          </div>
        </div>

        {/* Services */}
        <div className="footer-col services-col">
          <h4>Services</h4>
          <ul className="services-grid">
            {services?.map((service, index) => (
              <li key={index}>
                <Link to={`/services/${service._id}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/#how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/refund-policy">Refund Policy</Link>
            </li>
            <li>
              <Link to="/disclaimer">Disclaimer</Link>
            </li>
            <li>
              <Link to="/claim">Claim</Link>
            </li>
            <li>
              <Link to="/security">Security</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-left">
          © {new Date().getFullYear()} MyGSTs. All rights reserved.
        </div>

        <div className="footer-center">
          <FaLock /> SSL Secured • Safe Payments
        </div>

        <div className="footer-socials">
          <a href="#">
            <FaLinkedinIn />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
