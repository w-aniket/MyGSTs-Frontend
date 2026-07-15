import React from "react";
import { FaBolt, FaStopwatch, FaHandshake, FaLock } from "react-icons/fa";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Fast & Responsive Support",
      desc: "Get quick responses from our expert team whenever you need assistance.",
      icon: <FaBolt />,
    },
    {
      title: "Quick & Accurate Service",
      desc: "Our streamlined process ensures fast delivery with zero compromise on accuracy.",
      icon: <FaStopwatch />,
    },
    {
      title: "Trusted by Businesses",
      desc: "Hundreds of growing businesses rely on us for compliance and accounting.",
      icon: <FaHandshake />,
    },
    {
      title: "Secure & Confidential Data",
      desc: "Your financial data is protected using industry-standard security practices.",
      icon: <FaLock />,
    },
  ];

  return (
    <section className="why-choose-section">
      <div className="why-container">
        <h2 className="why-title">Why Choose Us</h2>
        <p className="why-subtitle">
          Reliable, secure, and professional services you can trust
        </p>

        <div className="why-grid">
          {reasons.map((item, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;