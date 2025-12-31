import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Fill Service Request",
      desc: "Select your service and fill the form with your details and documents.",
    },
    {
      number: 2,
      title: "Submit & Payment",
      desc: "Submit your request and choose to pay now or pay later.",
    },
    {
      number: 3,
      title: "Work Completion",
      desc: "Our team completes the work and uploads the completed files.",
    },
    {
      number: 4,
      title: "Download Work",
      desc: "Download your completed work once payment is confirmed.",
    },
  ];

  return (
    <div className="how-section">
      <div className="how-container">
        <h2>How It Works</h2>
        <p>
          Follow these simple steps to request, complete, and receive your services seamlessly.
        </p>

        <div className="how-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-icon">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
