import React from "react";
import { Helmet } from "react-helmet-async";
import "../PrivacyPolicy/Legal.css";

const CookieDeclaration = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Declaration | MyGSTs</title>
        <meta
          name="description"
          content="Cookie Declaration for MyGSTs explaining how cookies and similar technologies are used on our platform."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Cookie Declaration</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help websites function properly, enhance user
          experience, and provide analytical insights.
        </p>

        <h2>2. How MyGSTs Uses Cookies</h2>
        <p>
          MyGSTs uses cookies and similar technologies to ensure smooth platform
          operation, improve performance, and understand how users interact
          with our services.
        </p>

        <h2>3. Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for core functionality
            such as login, authentication, and security.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us analyze traffic and
            usage patterns to improve platform performance.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Remember user preferences and
            settings to provide a personalized experience.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Collect anonymous data about how
            users interact with our website.
          </li>
        </ul>

        <h2>4. Third-Party Cookies</h2>
        <p>
          Some cookies may be placed by trusted third-party services such as
          analytics tools or payment gateways. These cookies are governed by
          the respective third party’s privacy policies.
        </p>

        <h2>5. Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings.
          Please note that disabling certain cookies may affect the
          functionality and performance of the MyGSTs platform.
        </p>

        <h2>6. Consent</h2>
        <p>
          By continuing to use MyGSTs, you consent to the use of cookies as
          described in this Cookie Declaration, unless you disable them through
          your browser settings.
        </p>

        <h2>7. Updates to This Cookie Declaration</h2>
        <p>
          We may update this Cookie Declaration from time to time to reflect
          changes in technology, law, or our practices. Any updates will be
          posted on this page.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us
          at <strong>support@mygsts.com</strong>.
        </p>
      </section>
    </>
  );
};

export default CookieDeclaration;
