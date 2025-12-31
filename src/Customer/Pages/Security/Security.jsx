import React from "react";
import { Helmet } from "react-helmet-async";
import "../PrivacyPolicy/Legal.css";

const Security = () => {
  return (
    <>
      <Helmet>
        <title>Security | MyGSTs</title>
        <meta
          name="description"
          content="Security practices at MyGSTs explaining how we protect user data, accounts, and payments."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Security</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Our Commitment to Security</h2>
        <p>
          At MyGSTs, security is a core priority. We are committed to protecting
          your personal, business, and financial information through robust
          technical and organizational safeguards.
        </p>

        <h2>2. Data Protection Measures</h2>
        <p>
          We use industry-standard security practices, including encryption,
          access controls, and secure infrastructure, to protect data stored on
          our platform from unauthorized access, disclosure, or misuse.
        </p>

        <h2>3. Account Security</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their
          login credentials. We recommend using strong passwords and avoiding
          sharing account details with others.
        </p>

        <h2>4. Payment Security</h2>
        <p>
          All payments on MyGSTs are processed through trusted and secure payment
          gateways. We do not store sensitive payment information such as card
          details on our servers.
        </p>

        <h2>5. Access Control</h2>
        <p>
          Access to user data is limited to authorized personnel only and is
          granted strictly on a need-to-know basis to provide and maintain our
          services.
        </p>

        <h2>6. System Monitoring & Updates</h2>
        <p>
          Our systems are continuously monitored for potential security threats.
          We regularly update our software and infrastructure to apply security
          patches and improvements.
        </p>

        <h2>7. Third-Party Services</h2>
        <p>
          MyGSTs may integrate with third-party services such as payment
          processors or communication tools. While we select trusted partners,
          their security practices are governed by their own policies.
        </p>

        <h2>8. Reporting Security Issues</h2>
        <p>
          If you believe you have discovered a security vulnerability or notice
          suspicious activity, please report it immediately by contacting us at{" "}
          <strong>security@mygsts.com</strong>.
        </p>

        <h2>9. Changes to This Security Page</h2>
        <p>
          We may update this Security page periodically to reflect improvements
          or changes in our security practices. Updates will be posted on this
          page.
        </p>
      </section>
    </>
  );
};

export default Security;
