import React from "react";
import { Helmet } from "react-helmet-async";
import "../PrivacyPolicy/Legal.css";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | MyGSTs</title>
        <meta
          name="description"
          content="Terms and Conditions governing the use of the MyGSTs GST and accounting platform."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Terms & Conditions</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Agreement to These Terms</h2>
        <p>
          These Terms & Conditions (“Terms”) govern your access to and use of the
          MyGSTs website, platform, and related services (collectively, the
          “Services”). By accessing or using MyGSTs, you agree to be bound by
          these Terms. If you do not agree, you must discontinue use of the
          Services immediately.
        </p>

        <h2>2. About MyGSTs</h2>
        <p>
          MyGSTs is a digital accounting and GST compliance platform designed to
          help individuals, startups, freelancers, and businesses manage
          invoicing, accounting, payments, and statutory compliance.
        </p>

        <h2>3. Eligibility</h2>
        <p>
          You must be at least 18 years old to use the Services. By using MyGSTs,
          you confirm that you are legally capable of entering into a binding
          agreement under Indian law.
        </p>

        <h2>4. User Registration</h2>
        <ul>
          <li>Some features require account registration.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>You agree to provide accurate and up-to-date information.</li>
          <li>
            MyGSTs may suspend or terminate accounts with false or misleading
            information.
          </li>
        </ul>

        <h2>5. Services Disclaimer</h2>
        <p>
          MyGSTs provides software tools and workflows for accounting and GST
          compliance. Unless explicitly stated, MyGSTs does not provide legal or
          tax advisory services. You remain solely responsible for the accuracy
          of data and filings made using the platform.
        </p>

        <h2>6. Payments & Subscriptions</h2>
        <p>
          Paid services may be offered through subscriptions or one-time
          payments. All prices are listed in Indian Rupees (INR) unless stated
          otherwise. Payments are non-refundable unless explicitly mentioned.
          MyGSTs reserves the right to change pricing at any time.
        </p>

        <h2>7. Intellectual Property Rights</h2>
        <p>
          All content, software, logos, trademarks, designs, and materials
          available on MyGSTs are the exclusive property of MyGSTs or its
          licensors. Unauthorized use is strictly prohibited.
        </p>

        <h2>8. Prohibited Activities</h2>
        <ul>
          <li>Using the platform for illegal or unauthorized purposes</li>
          <li>Attempting to gain unauthorized access to systems</li>
          <li>Uploading malicious or harmful code</li>
          <li>Misusing payment systems or impersonating others</li>
          <li>Scraping, copying, or exploiting platform data</li>
        </ul>

        <h2>9. User Content</h2>
        <p>
          You retain ownership of content you upload. By submitting content, you
          grant MyGSTs permission to process it solely for the purpose of
          providing Services. You confirm that you have the legal right to share
          such content.
        </p>

        <h2>10. Data & Privacy</h2>
        <p>
          Your use of MyGSTs is governed by our Privacy Policy. By using the
          platform, you consent to the collection, storage, and processing of
          data in accordance with applicable laws in India.
        </p>

        <h2>11. Third-Party Services</h2>
        <p>
          MyGSTs may integrate with third-party tools or payment gateways. We are
          not responsible for the content, policies, or practices of third-party
          services.
        </p>

        <h2>12. Termination</h2>
        <p>
          MyGSTs reserves the right to suspend or terminate access to the
          Services for violations of these Terms or for any misuse of the
          platform, without prior notice when required.
        </p>

        <h2>13. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, MyGSTs shall not be liable for
          any indirect, incidental, or consequential damages. Total liability,
          if any, shall not exceed the amount paid by you in the last three
          months.
        </p>

        <h2>14. Disclaimer</h2>
        <p>
          The Services are provided “as is” and “as available.” We do not
          guarantee uninterrupted availability, error-free operation, or
          specific results.
        </p>

        <h2>15. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with the
          laws of India. Courts in India shall have exclusive jurisdiction.
        </p>

        <h2>16. Changes to Terms</h2>
        <p>
          MyGSTs may update these Terms at any time. Continued use of the
          Services after changes indicates acceptance of the updated Terms.
        </p>

        <h2>17. Contact Us</h2>
        <p>
          For any questions regarding these Terms & Conditions, please contact
          us at <strong>support@mygsts.com</strong>.
        </p>
      </section>
    </>
  );
};

export default TermsAndConditions;
