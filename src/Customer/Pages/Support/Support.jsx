import "./Support.css";
import { FAQ } from "../../../Component/FAQ/FAQ";
import { Link } from "react-router-dom";
import SupportTicket from "./SupportTicket/SupportTicket";
import { Helmet } from "react-helmet-async";

const Support = () => {
  return (
    <>
      <Helmet>
        <title>
          Support Center | MyGSTs – Help, Payments, Refunds & Service Queries
        </title>

        <meta
          name="description"
          content="MyGSTs Support Center helps you with service tracking, payments, refunds, GST queries, and technical assistance. Get expert support within 24 hours."
        />

        <link rel="canonical" href="https://www.mygsts.in/support" />

        {/* Organization + Support Contact Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MyGSTs",
            url: "https://www.mygsts.in",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8830078732",
              contactType: "customer support",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi", "Marathi"],
            },
          })}
        </script>

        {/* FAQ Schema (important for Google rich results) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How can I raise a support ticket on MyGSTs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can raise a support ticket using the form available on the Support page. Our team will respond within 24 hours.",
                },
              },
              {
                "@type": "Question",
                name: "What is the response time for support requests?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our standard response time is within 24 hours during business hours.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get help with payments and refunds?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our support team assists with payment issues, refunds, and service-related queries.",
                },
              },
            ],
          })}
        </script>
      </Helmet>
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
            For urgent issues or direct help, reach out to our support team
            through the following methods:
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
            <li>⏰ Support Hours: Mon – Sat, 10 AM – 6 PM</li>
          </ul>
        </section>

        <footer className="support-footer-links">
          <h3>Helpful Links</h3>
          <ul>
            <li>
              <Link to="/terms-and-conditions" className="footer-link">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="footer-link">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact Page
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Support;
