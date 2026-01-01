import React from "react";
import {
  FaBullseye,
  FaFileInvoice,
  FaLock,
  FaUsers,
  FaChartLine,
  FaHandshake,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import "./AboutUs.css";
import { useNavigate } from "react-router-dom";
import { AnimatedCard } from "../../../Component/AnimatedCard/AnimatedCard";
import { Helmet } from "react-helmet-async";
import WhyChooseUs from "../../../Component/WhyChooseUs/WhyChooseUs";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>About Us | MyGSTs – GST & Accounting Platform</title>
        <meta
          name="description"
          content="MyGSTs is a modern GST and accounting platform helping Indian businesses manage compliance, invoicing, and payments with ease."
        />
      </Helmet>

      <section className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About MyGSTs</h1>
          <p>
            Simplifying GST and accounting for individuals, startups, and
            businesses across India.
          </p>
        </div>

        {/* Mission */}
        <div className="about-section">
          <h2>Our Mission</h2>
          <div className="icon-card">
            <FaBullseye className="icon" />
            <p>
              To remove the complexity of GST and accounting by providing a
              secure, transparent, and easy-to-use digital platform.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="about-section">
          <h2>What We Do</h2>
          <div className="card-grid">
            <AnimatedCard>
              <FaFileInvoice className="icon" />
              <h3>GST & Invoicing</h3>
              <p>GST filing, invoice creation, and compliance tracking.</p>
            </AnimatedCard>
            <AnimatedCard>
              <FaChartLine className="icon" />
              <h3>Accounting</h3>
              <p>Clear financial records and structured workflows.</p>
            </AnimatedCard>
            <AnimatedCard>
              <FaLock className="icon" />
              <h3>Secure Payments</h3>
              <p>Safe and reliable online payment processing.</p>
            </AnimatedCard>
          </div>
        </div>

        {/* trusted $ secure */}
        <div className="about-section">
          <h2>Trusted & Secure</h2>
          <div className="card-grid">
            <AnimatedCard>
              <FaShieldAlt className="icon" />
              <p>Secure & Encrypted Platform</p>
            </AnimatedCard>

            <AnimatedCard>
              <FaCheckCircle className="icon" />
              <p>GST Compliant Workflows</p>
            </AnimatedCard>

            <AnimatedCard>
              <FaLock className="icon" />
              <p>Data Privacy Guaranteed</p>
            </AnimatedCard>
          </div>
        </div>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Our team */}
        <div className="about-section">
          <h2>Our Team</h2>
          <div className="card-grid">
            <AnimatedCard>
                <FaUsers className="icon" />
              <h3>Accounting Experts</h3>
              <p>Certified professionals with GST experience.</p>
            </AnimatedCard>

            <AnimatedCard>
                <FaUsers className="icon" />
              <h3>Tech Specialists</h3>
              <p>Engineers building secure and scalable systems.</p>
            </AnimatedCard>
          </div>
        </div>

        {/* Vision */}
        <div className="about-section">
          <h2>Our Vision</h2>
          <p className="vision-text">
            To become a trusted digital accounting partner for every Indian
            business by delivering accurate, compliant, and scalable solutions.
          </p>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>Get Started with MyGSTs</h2>
          <p>Take control of your GST and accounting today.</p>
          <button className="primary-btn" onClick={() => navigate("/services")}>
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
