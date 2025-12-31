import React from "react";
import { Helmet } from "react-helmet-async";
import "./Legal.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MyGSTs</title>
        <meta
          name="description"
          content="Privacy Policy for MyGSTs explaining how we collect, use, and protect user data."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          MyGSTs values your privacy and is committed to protecting your personal
          and financial information. This Privacy Policy explains how we
          collect, use, store, and protect your data when you use our platform.
        </p>

        <h2>2. Information We Collect</h2>
        <ul>
          <li>Personal details such as name, email address, and phone number</li>
          <li>Business and GST-related information</li>
          <li>Payment and transaction details</li>
          <li>Uploaded documents and files</li>
          <li>Technical data such as IP address and browser information</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide accounting and GST-related services</li>
          <li>To process payments securely</li>
          <li>To improve platform performance and user experience</li>
          <li>To communicate important updates and notifications</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data,
          including encryption, access control, and secure servers. However, no
          system can be completely secure.
        </p>

        <h2>5. Data Sharing</h2>
        <p>
          We do not sell or rent your personal data. Information may be shared
          only with trusted service providers or when required by law.
        </p>

        <h2>6. Cookies</h2>
        <p>
          MyGSTs uses cookies to enhance user experience and analyze platform
          usage. You may disable cookies through your browser settings.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          You have the right to access, update, or request deletion of your
          personal data, subject to applicable laws.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <strong>support@mygsts.com</strong>.
        </p>
      </section>
    </>
  );
};

export default PrivacyPolicy;
