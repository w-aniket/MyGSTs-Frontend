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
          content="Claims and Grievance Policy for MyGSTs explaining how users can raise complaints, disputes, or service-related claims."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Claims & Grievance Policy</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Purpose</h2>
        <p>
          This Claims and Grievance Policy outlines the process for users to
          raise complaints, disputes, or claims related to services provided
          by MyGSTs. We are committed to resolving issues fairly, transparently,
          and within a reasonable timeframe.
        </p>

        <h2>2. Scope of Claims</h2>
        <p>Users may raise claims related to:</p>
        <ul>
          <li>Service quality or delays</li>
          <li>Incorrect billing or payment issues</li>
          <li>GST filing or documentation concerns</li>
          <li>Technical issues affecting service delivery</li>
        </ul>

        <h2>3. Exclusions</h2>
        <p>Claims will not be entertained for:</p>
        <ul>
          <li>Issues caused by incorrect or incomplete information provided by the user</li>
          <li>Delays due to government portals or third-party systems</li>
          <li>Matters beyond the control of MyGSTs</li>
          <li>Requests made after unreasonable delay</li>
        </ul>

        <h2>4. How to Raise a Claim</h2>
        <p>
          Users can raise a claim by contacting our support team with relevant
          details, including service ID, issue description, and supporting
          documents.
        </p>

        <p>
          Email: <strong>support@mygsts.com</strong>
        </p>

        <h2>5. Resolution Timeline</h2>
        <p>
          We aim to acknowledge all claims within <strong>48 hours</strong> and
          resolve them within <strong>7–10 business days</strong>, depending on
          the nature of the issue.
        </p>

        <h2>6. Escalation</h2>
        <p>
          If a user is not satisfied with the initial resolution, the claim may
          be escalated for further review. Escalation requests must be submitted
          in writing with reference to the original claim.
        </p>

        <h2>7. No Guarantee of Outcome</h2>
        <p>
          Submission of a claim does not guarantee a refund or favorable
          outcome. All claims are reviewed on a case-by-case basis.
        </p>

        <h2>8. Policy Updates</h2>
        <p>
          MyGSTs reserves the right to modify this Claims and Grievance Policy
          at any time. Any updates will be published on this page.
        </p>

        <h2>9. Contact Information</h2>
        <p>
          For any questions regarding this policy, please contact us at{" "}
          <strong>support@mygsts.com</strong>.
        </p>
      </section>
    </>
  );
};

export default Claims;
