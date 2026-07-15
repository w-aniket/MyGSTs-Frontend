import React from "react";
import "./Consentcheckbox.css"

/**
 * ConsentCheckbox
 *
 * Reusable "I agree to Privacy Policy & Terms" checkbox for forms.
 * Disables the submit button until checked, as required for valid
 * consent under the DPDP Act, 2023.
 *
 * Usage:
 *   const [agreed, setAgreed] = useState(false);
 *
 *   <ConsentCheckbox checked={agreed} onChange={setAgreed} />
 *   <button disabled={!agreed} type="submit">Submit</button>
 *
 * For the Job/Course form, also render the optional partner-sharing
 * checkbox and require both before enabling submit.
 */
const ConsentCheckbox = ({
  checked,
  onChange,
  id = "consent-checkbox",
  showPartnerConsent = false,
  partnerChecked = false,
  onPartnerChange = () => {},
}) => {
  return (
    <div className="consent-check-wrapper">
      <label className="consent-check-row" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
        />
        <span>
          I have read and agree to the{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            Terms & Conditions
          </a>
          {/* , and I consent-check to the collection and processing of my information
          (including PAN/Aadhaar/documents where applicable) as described
          therein. */}
        </span>
      </label>

      {showPartnerConsent && (
        <label className="consent-check-row" htmlFor={`${id}-partner`}>
          <input
            type="checkbox"
            id={`${id}-partner`}
            checked={partnerChecked}
            onChange={(e) => onPartnerChange(e.target.checked)}
            required
          />
          <span>
            I consent to my profile/resume being shared with partner
            companies for job placement purposes.
          </span>
        </label>
      )}
    </div>
  );
};

export default ConsentCheckbox;