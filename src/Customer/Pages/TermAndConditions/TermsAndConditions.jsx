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
          content="Terms and Conditions governing the use of the MyGSTs platform for GST, ITR, import-export, shop act registrations, courses, and job placement services."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Terms & Conditions</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Agreement to These Terms</h2>
        <p>
          These Terms & Conditions ("Terms") govern your access to and use of
          the MyGSTs website, platform, and related services (collectively,
          the "Services"). By accessing or using MyGSTs, you agree to be
          bound by these Terms. If you do not agree, you must discontinue use
          of the Services immediately.
        </p>

        <h2>2. About MyGSTs</h2>
        <p>
          MyGSTs is a digital compliance, accounting, and career-services
          platform. Our Services include, but are not limited to:
        </p>
        <ul>
          <li>Income Tax Return (ITR) filing assistance</li>
          <li>GST registration, returns, and compliance</li>
          <li>Import-Export Code (IE Code) registration</li>
          <li>Shop & Establishment Act registration</li>
          <li>MSME/Udyam and other business registrations</li>
          <li>Skill development courses and certifications</li>
          <li>Job placement and hiring assistance with partner companies</li>
        </ul>

        <h2>3. Eligibility</h2>
        <p>
          You must be at least 18 years old, or a business entity acting
          through an authorised signatory, to use the Services. By using
          MyGSTs, you confirm that you are legally capable of entering into a
          binding agreement under Indian law.
        </p>

        <h2>4. User Registration</h2>
        <ul>
          <li>Some features require account registration.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>
            You agree to provide accurate, current, and complete information,
            including any PAN, Aadhaar, business, or financial details
            requested for a specific service.
          </li>
          <li>
            MyGSTs may suspend or terminate accounts with false or misleading
            information.
          </li>
        </ul>

        <h2>5. Services Disclaimer</h2>
        <p>
          MyGSTs provides software tools, workflows, and facilitation
          services for accounting, tax, and regulatory compliance. We act as
          a facilitator between you and the relevant government portal or
          authority (such as the Income Tax e-filing portal, GSTN, DGFT, or
          state Shop Act authorities); we are not the issuing or approving
          authority. Approval, rejection, or processing timelines for any
          filing or registration are determined solely by the concerned
          government department and are outside our control. You remain
          solely responsible for the accuracy and authenticity of the data,
          documents, and information provided for any filing or registration
          made using the platform.
        </p>

        <h2>6. Document Submission & User Warranties</h2>
        <p>
          You warrant that all documents submitted to us, including PAN,
          Aadhaar, financial statements, business proofs, and other KYC
          documents, are genuine, accurate, and lawfully obtained. You agree
          to indemnify and hold MyGSTs harmless against any claim, penalty,
          or loss arising from false, forged, or fraudulent documents or
          information provided by you.
        </p>

        <h2>7. Payments, Fees & Refund Policy</h2>
        <p>
          Paid services may be offered through subscriptions, one-time
          service fees, or course fees. All prices are listed in Indian
          Rupees (INR) unless stated otherwise. Government fees, duties, or
          statutory charges (where applicable) are separate from our service
          fees and are non-refundable once paid to the relevant authority.
          Service fees are non-refundable once a filing or application has
          been submitted to a government portal, except where explicitly
          stated otherwise for a specific service. Course fees, if
          refundable, will be governed by the cancellation window mentioned
          at the time of enrollment. MyGSTs reserves the right to change
          pricing at any time.
        </p>

        <h2>8. Courses & Certifications</h2>
        <p>
          Certificates are issued only on satisfactory completion of the
          applicable course requirements, including attendance and/or
          assessment criteria, as specified for that course. A certificate
          reflects completion of training and does not, by itself, guarantee
          employment, interview calls, or any specific career outcome.
        </p>

        <h2>9. Job Placement & Partner Companies</h2>
        <ul>
          <li>
            By submitting a job application, resume, or profile through
            MyGSTs, you consent to your information being shared with our
            partner companies for recruitment purposes.
          </li>
          <li>
            MyGSTs acts only as a facilitator between you and hiring partner
            companies. We do not guarantee an interview, job offer,
            employment, or any specific salary or role.
          </li>
          <li>
            No employer-employee relationship is created between you and
            MyGSTs on account of using our job placement services. The final
            hiring decision rests solely with the partner company.
          </li>
        </ul>

        <h2>10. Intellectual Property Rights</h2>
        <p>
          All content, software, course material, logos, trademarks,
          designs, and materials available on MyGSTs are the exclusive
          property of MyGSTs or its licensors. Unauthorized use,
          reproduction, or resale, including of course content, is strictly
          prohibited.
        </p>

        <h2>11. Prohibited Activities</h2>
        <ul>
          <li>Using the platform for illegal or unauthorized purposes</li>
          <li>Submitting forged, false, or another person's documents without authorization</li>
          <li>Attempting to gain unauthorized access to systems</li>
          <li>Uploading malicious or harmful code</li>
          <li>Misusing payment systems or impersonating others</li>
          <li>Scraping, copying, or exploiting platform data</li>
        </ul>

        <h2>12. User Content</h2>
        <p>
          You retain ownership of content and documents you upload. By
          submitting content, you grant MyGSTs permission to process it
          solely for the purpose of providing the relevant Service. You
          confirm that you have the legal right to share such content.
        </p>

        <h2>13. Data & Privacy</h2>
        <p>
          Your use of MyGSTs, including the collection, storage, sharing, and
          processing of your personal and financial data (such as PAN,
          Aadhaar, and other KYC information), is governed by our{" "}
          <a href="/privacy-policy">Privacy Policy</a>. By using the
          platform, you consent to such collection, storage, and processing
          in accordance with applicable laws in India, including the
          Information Technology Act, 2000 and the Digital Personal Data
          Protection Act, 2023.
        </p>

        <h2>14. Third-Party Services</h2>
        <p>
          MyGSTs may integrate with third-party tools, government portals,
          payment gateways, or hiring partner companies. We are not
          responsible for the content, policies, decisions, or practices of
          such third parties.
        </p>

        <h2>15. Termination</h2>
        <p>
          MyGSTs reserves the right to suspend or terminate access to the
          Services for violations of these Terms or for any misuse of the
          platform, without prior notice when required.
        </p>

        <h2>16. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, MyGSTs shall not be liable
          for any indirect, incidental, or consequential damages, including
          delays or rejections by government authorities, or hiring
          decisions made by partner companies. Total liability, if any,
          shall not exceed the amount paid by you for the specific Service
          giving rise to the claim in the preceding three months.
        </p>

        <h2>17. Disclaimer</h2>
        <p>
          The Services are provided "as is" and "as available." We do not
          guarantee uninterrupted availability, error-free operation, or
          specific results, including specific filing approval timelines or
          job placement outcomes.
        </p>

        <h2>18. Indemnity</h2>
        <p>
          You agree to indemnify and hold MyGSTs, its employees, and partners
          harmless from any claim, loss, or liability arising out of your
          breach of these Terms, misuse of the Services, or submission of
          inaccurate or fraudulent information.
        </p>

        <h2>19. Governing Law & Jurisdiction</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with
          the laws of India. Courts at [Your City, e.g., Nashik,
          Maharashtra] shall have exclusive jurisdiction over any disputes
          arising from these Terms.
        </p>

        <h2>20. Grievance Redressal</h2>
        <p>
          In accordance with the Information Technology Act, 2000 and rules
          made thereunder, and the Digital Personal Data Protection Act,
          2023, the details of the Grievance Officer are provided below:
        </p>
        <p>
          Name: [Grievance Officer Name]
          <br />
          Designation: Grievance Officer
          <br />
          Email: <strong>grievance@mygsts.com</strong>
          <br />
          Address: [Registered Office Address]
        </p>

        <h2>21. Changes to Terms</h2>
        <p>
          MyGSTs may update these Terms at any time. Continued use of the
          Services after changes indicates acceptance of the updated Terms.
        </p>

        <h2>22. Contact Us</h2>
        <p>
          For any questions regarding these Terms & Conditions, please
          contact us at <strong>support@mygsts.com</strong>.
        </p>
      </section>
    </>
  );
};

export default TermsAndConditions;