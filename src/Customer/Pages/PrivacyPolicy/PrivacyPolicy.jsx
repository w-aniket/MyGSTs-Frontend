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
          content="Privacy Policy for MyGSTs explaining how we collect, use, share, and protect user data across our GST, ITR, registration, course, and job placement services."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          MyGSTs values your privacy and is committed to protecting your
          personal and financial information. This Privacy Policy explains
          how we collect, use, store, share, and protect your data when you
          use our platform for GST, ITR, import-export, shop act, and other
          registrations, our courses, and our job placement services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following categories of information, depending on which service or form you use:</p>
        <ul>
          <li>
            <strong>Account/Registration:</strong> name, email address, phone
            number, password, address
          </li>
          <li>
            <strong>Service Request forms (ITR, GST, Import-Export, Shop
            Act, MSME, and other registrations):</strong> PAN, Aadhaar,
            business details, bank details, financial statements, and other
            KYC documents
          </li>
          <li>
            <strong>Course Form:</strong> educational qualifications,
            resume/CV, work experience, and payment details
          </li>
          <li>
            <strong>Job Hiring / Placement:</strong> resume, employment
            history, and references, which may be shared with partner
            companies as described in Section 5
          </li>
          <li>
            <strong>Contact Page:</strong> name, email, and message content
          </li>
          <li>
            <strong>Automatically collected:</strong> IP address,
            browser/device information, cookies, and usage/analytics data
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To process ITR, GST, import-export, shop act, and other registrations and filings with the relevant government portals</li>
          <li>To provide accounting, compliance, and related services</li>
          <li>To deliver courses and issue certifications</li>
          <li>To match candidates with job openings at partner companies</li>
          <li>To process payments securely</li>
          <li>To respond to contact/support queries</li>
          <li>To send service updates, invoices, and important notifications</li>
          <li>To improve platform performance and user experience</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>

        <h2>4. Consent</h2>
        <p>
          Sensitive personal data, such as PAN, Aadhaar, and financial
          information, is collected only with your explicit, informed
          consent, given at the time of submitting the relevant form. You may
          withdraw consent at any time by contacting us, though this may mean
          we are unable to complete a service that requires that
          information.
        </p>

        <h2>5. How We Share Your Information</h2>
        <p>We do not sell or rent your personal data. We may share your information only in the following circumstances:</p>
        <ul>
          <li>
            <strong>Government portals and authorities</strong> (such as the
            Income Tax e-filing portal, GSTN, DGFT, state Shop Act
            authorities, and MSME/Udyam) where necessary to process your
            filing or registration
          </li>
          <li>
            <strong>Job/placement partner companies</strong> — if you apply
            for a job or submit your profile through MyGSTs, your resume and
            related details may be shared with our hiring partner companies
            for recruitment purposes
          </li>
          <li>
            <strong>Payment gateways</strong> for processing transactions
            securely
          </li>
          <li>
            <strong>Trusted service providers</strong> (such as hosting and
            analytics providers) bound by confidentiality obligations
          </li>
          <li>When required by law, regulation, or a valid court/government order</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          data, including encryption, access control, and secure servers,
          particularly for sensitive documents like PAN and Aadhaar copies.
          However, no system can be completely secure, and data is shared
          with us at your own informed risk.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We retain your personal and financial data for as long as
          necessary to provide the Services and to comply with statutory
          record-keeping requirements under applicable tax and business laws
          (which may require retention for several years after a filing).
          Resume and job application data is retained until you request its
          deletion or for a reasonable period after your last activity,
          whichever is earlier.
        </p>

        <h2>8. Cookies</h2>
        <p>
          MyGSTs uses cookies to enhance user experience and analyze platform
          usage. You may disable cookies through your browser settings,
          though this may affect some site functionality.
        </p>

        <h2>9. Your Rights</h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023 and applicable
          Indian law, you have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct or update inaccurate or incomplete data</li>
          <li>Withdraw consent for further processing</li>
          <li>Request deletion of your data, subject to our statutory retention obligations</li>
          <li>Raise a grievance regarding how your data is handled</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the
          details in Section 12.
        </p>

        <h2>10. Children's Privacy</h2>
        <p>
          Our Services are not directed at, or intended for use by,
          individuals under the age of 18.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material
          changes will be notified through the website, and the "Last
          updated" date above will reflect the most recent revision.
        </p>

        <h2>12. Grievance Officer / Contact Us</h2>
        <p>
          In accordance with the Information Technology Act, 2000 and the
          Digital Personal Data Protection Act, 2023, if you have any
          questions, concerns, or grievances about this Privacy Policy or how
          your data is handled, please contact:
        </p>
        <p>
          Name: [Grievance Officer Name]
          <br />
          Designation: Grievance Officer
          <br />
          Email: <strong>grievance@mygsts.com</strong>
          <br />
          General queries: <strong>support@mygsts.com</strong>
          <br />
          Address: [Registered Office Address]
        </p>
      </section>
    </>
  );
};

export default PrivacyPolicy;