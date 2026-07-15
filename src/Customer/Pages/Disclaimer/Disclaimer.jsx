import React from "react";
import { Helmet } from "react-helmet-async";
import "../PrivacyPolicy/Legal.css";

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer | MyGSTs</title>
        <meta
          name="description"
          content="Disclaimer for MyGSTs covering our GST, ITR, registration, shop act, course, and job placement services, including limitations on guarantees and professional advice."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Disclaimer</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. General Information</h2>
        <p>
          The content on MyGSTs — including articles, form guidance, course
          material, and any information provided by our team — is offered
          for general informational purposes only. While we try to keep
          information accurate and up to date, tax laws, government
          procedures, and eligibility criteria change frequently, and we
          make no representation or warranty of any kind, express or
          implied, about the completeness, accuracy, or reliability of any
          information on this platform.
        </p>

        <h2>2. Not a Government Entity</h2>
        <p>
          MyGSTs is a private platform and is <strong>not affiliated with,
          endorsed by, or acting on behalf of</strong> the Income Tax
          Department, GSTN, the Directorate General of Foreign Trade
          (DGFT), any state Shop Act authority, the Ministry of MSME, or any
          other government body. We act as a facilitator that helps you
          prepare and submit your filings and registrations to these
          authorities; we are not the authority itself and have no control
          over their decisions, processing times, or portal availability.
        </p>

        <h2>3. No Guarantee of Approval or Outcome</h2>
        <p>
          For all filing and registration services (GST, ITR, Import-Export
          Code, Shop Act, MSME/Udyam, and others), MyGSTs facilitates
          preparation and submission on your behalf, but the final approval,
          rejection, processing time, or any query raised is entirely at the
          discretion of the relevant government authority. We do not
          guarantee approval, a specific outcome, or a specific processing
          timeline for any filing or registration, even where we quote an
          expected timeline as a general estimate.
        </p>

        <h2>4. Courses</h2>
        <p>
          Our courses are intended to build knowledge and skills in their
          respective subject areas. Completion of a course or receipt of a
          certificate from MyGSTs does <strong>not guarantee</strong> a job,
          promotion, salary increase, or any specific career outcome.
          Certificates issued by MyGSTs are proof of course completion and
          are not equivalent to a government-recognized degree or diploma
          unless explicitly stated on the certificate itself.
        </p>

        <h2>5. Career &amp; Placement Services</h2>
        <p>
          MyGSTs facilitates connections between candidates and hiring
          partner companies by sharing resumes and profiles, as described in
          our Privacy Policy. We do <strong>not guarantee</strong> an
          interview, job offer, or employment of any kind. Hiring decisions
          are made solely and independently by the partner companies, and
          MyGSTs has no control over, and takes no responsibility for, those
          decisions, the terms of employment offered, or the conduct of any
          partner company.
        </p>

        <h2>6. Not a Substitute for Professional Advice</h2>
        <p>
          Information provided through MyGSTs — including general guidance
          on GST, ITR, or other filings — is not a substitute for
          personalized advice from a qualified Chartered Accountant, tax
          consultant, or legal professional. Your specific situation may
          involve facts that change the correct course of action, and you
          should seek independent professional advice before making
          financial or legal decisions.
        </p>

        <h2>7. Third-Party Links and References</h2>
        <p>
          Our platform may contain links to government portals or other
          third-party websites for your convenience. We do not control and
          are not responsible for the content, accuracy, or availability of
          these external sites.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, MyGSTs and its team shall
          not be liable for any loss or damage — direct, indirect,
          incidental, or consequential — arising from your use of the
          platform, reliance on information provided, delays or rejections
          by government authorities, or outcomes of courses or placement
          services. This does not limit any liability that cannot be
          excluded under applicable Indian law.
        </p>

        <h2>9. Changes to This Disclaimer</h2>
        <p>
          We may update this Disclaimer from time to time. Material changes
          will be notified through the website, and the "Last updated" date
          above will reflect the most recent revision.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Disclaimer, please contact:
          <br />
          Email: <strong>support@mygsts.com</strong>
          <br />
          Address: [Registered Office Address]
        </p>
      </section>
    </>
  );
};

export default Disclaimer;