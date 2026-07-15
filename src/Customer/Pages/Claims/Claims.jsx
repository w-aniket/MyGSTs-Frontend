import React from "react";
import { Helmet } from "react-helmet-async";
import "../PrivacyPolicy/Legal.css";

const Claims = () => {
  return (
    <>
      <Helmet>
        <title>Claims & Grievance Policy | MyGSTs</title>
        <meta
          name="description"
          content="Claims and Grievance Policy for MyGSTs explaining how users can raise complaints, disputes, or service-related claims across our filing, course, and career services."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Claims & Grievance Policy</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Purpose</h2>
        <p>
          This Claims and Grievance Policy outlines the process for users to
          raise complaints, disputes, or claims related to any service
          provided by MyGSTs — including filing/registration services,
          courses, and career/placement support. We are committed to
          acknowledging and resolving issues fairly, transparently, and
          within a reasonable timeframe.
        </p>
        <p>
          This page covers the <strong>process</strong> for raising and
          resolving a claim. If your claim relates to a refund, the
          eligibility rules and deductions in our{" "}
          <a href="/refund-policy">Refund Policy</a> govern the outcome —
          this page does not override those terms.
        </p>

        <h2>2. Scope of Claims</h2>
        <p>Users may raise claims related to:</p>
        <ul>
          <li>Service quality, incomplete work, or delays on filing/registration services (GST, ITR, Shop Act, MSME, Import-Export, etc.)</li>
          <li>Incorrect billing, duplicate charges, or payment issues</li>
          <li>Errors or discrepancies in a filed document or submission</li>
          <li>Course access issues, content quality, or certification errors</li>
          <li>Career/placement service issues, such as a profile not being shared as agreed</li>
          <li>Technical issues on the platform affecting service delivery</li>
        </ul>

        <h2>3. Exclusions</h2>
        <p>Claims will not be entertained for:</p>
        <ul>
          <li>Issues caused by incorrect, incomplete, or delayed information/documents provided by the user</li>
          <li>Delays or rejections caused by government portals or other third-party systems outside our control</li>
          <li>Hiring decisions made independently by partner companies (see our Disclaimer)</li>
          <li>Course outcomes such as job placement, salary, or promotion, which are never guaranteed</li>
          <li>Matters beyond the reasonable control of MyGSTs</li>
          <li>Claims raised more than 30 days after the service was delivered or the issue occurred, except where a longer statutory period applies</li>
        </ul>

        <h2>4. How to Raise a Claim</h2>
        <p>
          Users can raise a claim by contacting our support team with:
        </p>
        <ul>
          <li>Your order/transaction ID or service reference number</li>
          <li>A clear description of the issue</li>
          <li>Any supporting documents or screenshots</li>
        </ul>
        <p>
          Email: <strong>support@mygsts.com</strong>
        </p>

        <h2>5. Resolution Timeline</h2>
        <p>
          We aim to acknowledge all claims within <strong>48 hours</strong>{" "}
          and resolve them within <strong>7–10 business days</strong>,
          depending on the nature of the issue. Claims requiring input from a
          government portal or a third party (such as a hiring partner) may
          take longer, and we will keep you informed of the expected
          timeline in that case.
        </p>

        <h2>6. Escalation</h2>
        <p>
          If you are not satisfied with the initial resolution, you may
          escalate the claim in writing, referencing your original claim and
          the response received. Escalated claims are reviewed by our
          Grievance Officer, whose contact details are listed in our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>7. No Guarantee of Outcome</h2>
        <p>
          Submission of a claim does not guarantee a refund, re-filing, or
          any other specific outcome. All claims are reviewed on a
          case-by-case basis against the applicable service terms, Refund
          Policy, and Disclaimer.
        </p>

        <h2>8. Policy Updates</h2>
        <p>
          MyGSTs reserves the right to modify this Claims and Grievance
          Policy at any time. Updates will be published on this page, with
          the "Last updated" date above reflecting the most recent revision.
        </p>

        <h2>9. Contact Information</h2>
        <p>
          For any questions regarding this policy, or to raise a claim,
          please contact us at <strong>support@mygsts.com</strong>. For
          formal grievances under the IT Act, 2000 and DPDP Act, 2023, see
          the Grievance Officer contact in our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>
    </>
  );
};

export default Claims;