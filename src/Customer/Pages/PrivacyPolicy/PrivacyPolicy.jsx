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
          content="Privacy Policy for MyGSTs explaining how we collect, use, share, and protect user data across our GST, ITR, registration, shop act, course, and job placement services."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          MyGSTs ("we", "us", "our") operates a platform offering (a) tax and
          business registration/filing services such as GST, ITR,
          Import-Export Code, Shop Act, and MSME/Udyam registration; (b)
          professional and skill-development courses; and (c) job placement
          and career support services (collectively, the "Services"). This
          Privacy Policy explains what information we collect across these
          Services, how we use and share it, and the choices you have.
          By using MyGSTs, you agree to the practices described here.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          What we collect depends on which part of the platform you use.
          Broadly, this falls into four groups:
        </p>

        <h3>2.1 Account &amp; Contact Information</h3>
        <ul>
          <li>Name, email address, phone number, password</li>
          <li>Billing/communication address</li>
          <li>Any message or query you submit via the Contact Us page</li>
        </ul>

        <h3>2.2 Filing &amp; Registration Services (GST, ITR, Shop Act, Import-Export, MSME, and other registrations)</h3>
        <p>
          To complete a filing or registration on your behalf, we collect the
          documents and details required by the relevant government
          authority, which may include:
        </p>
        <ul>
          <li>PAN, Aadhaar, and other government-issued identity documents</li>
          <li>Business/firm details, GST/business registration numbers</li>
          <li>Bank account details, financial statements, invoices, and other KYC or supporting documents you upload</li>
          <li>Payment details for the service fee (processed via our payment gateway — see Section 6)</li>
        </ul>
        <p>
          These documents are used <strong>only</strong> for the specific
          filing or registration you requested and to fulfil related legal
          or record-keeping obligations. We do not use identity or financial
          documents submitted for one service to process an unrelated
          service without your separate consent.
        </p>

        <h3>2.3 Courses</h3>
        <ul>
          <li>Educational qualifications and prior work experience (where relevant to course eligibility)</li>
          <li>Payment details for course fees</li>
          <li>Course progress, assessment results, and certification records</li>
        </ul>

        <h3>2.4 Careers / Job Placement</h3>
        <ul>
          <li>Resume/CV, educational qualifications, employment history, and references</li>
          <li>Personal details relevant to job matching (e.g. location, notice period, expected compensation)</li>
          <li>
            Your resume and profile may be actively marketed/shared with our
            hiring partner companies for recruitment purposes, as described
            in Section 5
          </li>
        </ul>

        <h3>2.5 Automatically Collected</h3>
        <ul>
          <li>IP address, browser/device information</li>
          <li>Cookies and usage/analytics data (see Section 8)</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To process ITR, GST, import-export, shop act, MSME, and other registrations and filings with the relevant government portals</li>
          <li>To provide accounting, compliance, and related advisory services</li>
          <li>To deliver courses, track progress, and issue certifications</li>
          <li>To build and market your candidate profile/resume to job openings at partner companies</li>
          <li>To process payments securely for services, courses, or placement-related fees</li>
          <li>To respond to contact/support queries</li>
          <li>To send service updates, invoices, and important notifications</li>
          <li>To improve platform performance and user experience</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>

        <h2>4. Consent</h2>
        <p>
          Sensitive personal data — such as PAN, Aadhaar, financial
          information, and resume/career details — is collected only with
          your explicit, informed consent, given at the time of submitting
          the relevant form (for example, via the consent checkbox on our
          service, course, and career forms). You may withdraw consent at
          any time by contacting us, though this may mean we are unable to
          complete a service that requires that information, or that we must
          stop actively marketing your resume to placement partners.
        </p>

        <h2>5. How We Share Your Information</h2>
        <p>
          We do not sell or rent your personal data. We may share your
          information only in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>Government portals and authorities</strong> (such as the
            Income Tax e-filing portal, GSTN, DGFT, state Shop Act
            authorities, and MSME/Udyam) where necessary to process your
            filing or registration
          </li>
          <li>
            <strong>Job/placement partner companies</strong> — if you apply
            for a job, enrol in a course with placement support, or submit
            your profile through MyGSTs, your resume and related details may
            be shared with our hiring partner companies for recruitment
            purposes
          </li>
          <li>
            <strong>Payment gateways</strong> for processing transactions
            securely. MyGSTs does not itself store your full card number,
            CVV, or net-banking credentials — these are handled directly by
            our PCI-DSS-compliant payment gateway partner
          </li>
          <li>
            <strong>Trusted service providers</strong> (such as hosting,
            document storage, and analytics providers) bound by
            confidentiality obligations
          </li>
          <li>When required by law, regulation, or a valid court/government order</li>
        </ul>

        <h2>6. Payments</h2>
        <p>
          All payments made on MyGSTs — for filing/registration services,
          courses, or any other paid feature — are processed through a
          third-party payment gateway. We receive confirmation of payment
          and a transaction reference, but do not store your complete card
          or banking credentials on our servers.
        </p>

        <h2>7. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          data, including encryption, access control, and secure servers,
          particularly for sensitive documents like PAN and Aadhaar copies
          and uploaded financial records. Access to uploaded documents is
          restricted to personnel who need it to complete your requested
          service. However, no system can be completely secure, and data is
          shared with us at your own informed risk.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain your personal and financial data for as long as
          necessary to provide the Services and to comply with statutory
          record-keeping requirements under applicable tax and business laws
          (which may require retention for several years after a filing).
          Course records and certificates are retained for as long as
          needed to verify your certification. Resume and job application
          data is retained until you request its deletion or for a
          reasonable period after your last activity, whichever is earlier.
        </p>

        <h2>9. Cookies</h2>
        <p>
          MyGSTs uses cookies to enhance user experience and analyze
          platform usage. You may disable cookies through your browser
          settings, though this may affect some site functionality.
        </p>

        <h2>10. Your Rights</h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023 and
          applicable Indian law, you have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct or update inaccurate or incomplete data</li>
          <li>Withdraw consent for further processing, including opting out of resume-sharing with placement partners</li>
          <li>Request deletion of your data, subject to our statutory retention obligations</li>
          <li>Raise a grievance regarding how your data is handled</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the
          details in Section 13.
        </p>

        <h2>11. Children's Privacy</h2>
        <p>
          Our Services are not directed at, or intended for use by,
          individuals under the age of 18.
        </p>

        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material
          changes will be notified through the website, and the "Last
          updated" date above will reflect the most recent revision.
        </p>

        <h2>13. Grievance Officer / Contact Us</h2>
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