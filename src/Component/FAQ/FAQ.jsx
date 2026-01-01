import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "Do I need to create an account to request a service?",
    answer:
      "Yes, you must log in to request services, upload documents, make payments, and track service progress.",
  },
  {
    question: "What services are available on MyGSTs?",
    answer:
      "MyGSTs provides GST filing, ITR filing, income tax registration, TDS filing, audits, registrations, licenses, and more.",
  },
  {
    question: "How do I request a service?",
    answer:
      "Log in, select a service, fill out the required form, upload documents, and submit the request.",
  },
  {
    question: "When does work on my service start?",
    answer:
      "Service work begins only after the payment is successfully completed.",
  },
  {
    question: "Who verifies my uploaded documents?",
    answer:
      "All documents are manually verified by our support and compliance team.",
  },
  {
    question: "Can I re-upload documents if they are rejected?",
    answer:
      "Yes, you can re-upload corrected documents from the service detail page if any document is rejected.",
  },
  {
    question: "Can I cancel a service request?",
    answer:
      "Yes, you can cancel a service request before work on the service has started.",
  },
  {
    question: "Will I get a refund after cancellation?",
    answer:
      "If canceled before work starts, the refund will be processed as per our refund policy.",
  },
  {
    question: "How long does it take to complete a service?",
    answer:
      "Service timelines vary by service type and document completeness. Estimated timelines are shared after review.",
  },
  {
    question: "Is the career profile mandatory?",
    answer: "No, the career profile section is optional.",
  },
  {
    question: "How is my profile data used?",
    answer:
      "Profile data is used only for job and career opportunities and not for any other purpose.",
  },
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="faq-question" onClick={() => toggleIndex(index)}>
              {faq.question}
              <span className="arrow">{activeIndex === index ? "▲" : "▼"}</span>
            </button>
            <div
              className="faq-answer"
              style={{
                maxHeight: activeIndex === index ? "500px" : "0px",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
