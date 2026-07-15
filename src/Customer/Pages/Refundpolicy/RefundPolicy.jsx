import React from "react";
import { Helmet } from "react-helmet-async";
import "../PrivacyPolicy/Legal.css";

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy | MyGSTs</title>
        <meta
          name="description"
          content="Refund Policy for MyGSTs covering eligibility, timelines, deductions, and cancellation terms for our GST, ITR, registration, shop act, course, and job placement services."
        />
      </Helmet>

      <section className="legal-container">
        <h1>Refund Policy</h1>
        <p className="updated">Last updated: {new Date().toDateString()}</p>

        <h2>1. Overview</h2>
        <p>
          This Refund Policy applies to all paid services on MyGSTs,
          including tax and business registration/filing services (GST,
          ITR, Import-Export Code, Shop Act, MSME/Udyam, and other
          registrations), courses, and any placement-related fees. Refunds
          are handled differently depending on the type of service, as
          described below, because the amount of work already completed
          differs across services.
        </p>

        <h2>2. Filing &amp; Registration Services</h2>
        <p>
          These services involve manual work (document review, form
          preparation, filing with government portals) that begins as soon
          as you submit your request and documents.
        </p>
        <ul>
          <li>
            <strong>Before work begins</strong> (i.e. before we start
            preparing or reviewing your documents): full refund of the
            service fee, minus any payment gateway charges actually
            deducted by Razorpay on the original transaction.
          </li>
          <li>
            <strong>After work has begun but before submission to the
            government portal:</strong> partial refund. We deduct an amount
            equivalent to the work already completed (e.g. document review,
            preparation time) before refunding the balance.
          </li>
          <li>
            <strong>After submission to a government portal</strong> (e.g.
            GSTN, Income Tax e-filing, DGFT, Shop Act authority,
            MSME/Udyam): <strong>no refund</strong> is possible for that
            portion of the service, since the filing has been made on your
            behalf and cannot be reversed by MyGSTs. Any government fee,
            stamp duty, or statutory charge already paid to the authority is
            non-refundable under all circumstances.
          </li>
        </ul>
        <p>
          <em>
            [Confirm: does MyGSTs charge a separate "processing fee" on top
            of the government fee? If so, specify here whether that
            processing fee is refundable before submission.]
          </em>
        </p>

        <h2>3. Courses</h2>
        <ul>
          <li>
            You may request a full refund within <strong>7 days</strong> of
            purchase, provided you have accessed{" "}
            <strong>less than 20%</strong> of the course content.
          </li>
          <li>
            Once you cross either the 7-day window or the 20% content
            threshold (whichever happens first), the course fee becomes
            non-refundable.
          </li>
          <li>
            If a course is cancelled or discontinued by MyGSTs before
            completion, you will receive a full refund or, at your choice,
            credit toward another course of equal value.
          </li>
        </ul>
        <p>
          <em>
            [Adjust the 7-day / 20% figures above if you'd like a different
            window — these are a reasonable industry-standard starting
            point, not a fixed requirement.]
          </em>
        </p>

        <h2>4. Career &amp; Placement Services</h2>
        <p>
          Where MyGSTs charges a fee directly to a candidate for career
          support, resume building, or placement assistance (as opposed to
          fees paid by hiring partner companies), the following applies:
        </p>
        <ul>
          <li>
            Full refund if cancelled before any resume review, profile
            building, or employer outreach has begun on your behalf.
          </li>
          <li>
            No refund once your profile has been actively shared with
            partner companies, since matching effort has already been
            undertaken.
          </li>
        </ul>
        <p>
          <em>
            [Confirm this section applies to your business — if candidates
            never pay directly for placement services, this section can be
            removed.]
          </em>
        </p>

        <h2>5. Non-Refundable Items</h2>
        <p>Regardless of service type, the following are never refundable:</p>
        <ul>
          <li>Government fees, stamp duty, or statutory charges already paid to a government authority on your behalf</li>
          <li>Payment gateway transaction charges actually deducted by Razorpay, where applicable</li>
          <li>Fees for services already fully delivered (e.g. a completed and filed return, a completed course, an issued certificate)</li>
        </ul>

        <h2>6. How to Request a Refund</h2>
        <p>
          To request a refund, contact us at{" "}
          <strong>support@mygsts.com</strong> with your order/transaction ID
          and the reason for cancellation. We will confirm your eligibility
          under this policy and the applicable deduction (if any) before
          processing.
        </p>

        <h2>7. Refund Timelines</h2>
        <p>
          Once a refund is approved, it is initiated within{" "}
          <strong>3–5 business days</strong>. Refunds are processed via our
          payment gateway, Razorpay, back to your{" "}
          <strong>original payment method</strong> (card, UPI, or
          netbanking, as applicable). Depending on your bank or card issuer,
          it may take an additional <strong>5–7 business days</strong> for
          the amount to reflect in your account after we initiate it.
        </p>

        <h2>8. Cancellations Initiated by MyGSTs</h2>
        <p>
          If MyGSTs is unable to provide a service you've paid for (for
          example, due to an eligibility issue discovered after payment, or
          a service being discontinued), you will receive a full refund
          regardless of the stage reached, unless a government fee has
          already been paid to an authority on your behalf, in which case
          only that portion is non-refundable.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Refund Policy from time to time. Material
          changes will be notified through the website, and the "Last
          updated" date above will reflect the most recent revision. The
          policy in effect at the time of your purchase governs that
          transaction.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For any questions about this Refund Policy or an existing refund
          request, contact:
          <br />
          Email: <strong>support@mygsts.com</strong>
          <br />
          Address: [Registered Office Address]
        </p>
      </section>
    </>
  );
};

export default RefundPolicy;