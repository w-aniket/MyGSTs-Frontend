import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ConsentCheckbox from "../Components/Legal/Consentcheckbox"; // adjust path to wherever you save ConsentCheckbox.jsx
import "./OtpLogin.css";

const OTPLogin = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailExist, setEmailExist] = useState(null);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [agreed, setAgreed] = useState(false); // consent checkbox state

  // keep regex here so both UI and sendOtp can use the same rule
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const startCooldown = () => {
    setCooldown(120); // set to 120s (2 minutes). Change to 20 for testing if required
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // helper boolean for button state
  const isEmailValid = email && emailRegex.test(email);

  const sendOtp = async () => {
    // double check before calling API
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required");
      return toast.error("Please enter your email");
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError("Please enter a valid email");
      return toast.error("Please enter a valid email");
    }
    if (!agreed) {
      return toast.error("Please accept the Privacy Policy and Terms & Conditions");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/send-otp`, { email: trimmed });

      setEmailExist(res.data?.exists);
      toast.success("OTP has been sent to your email");
      setStep(2);
      startCooldown();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/verify-otp`, { email: email.trim(), otp });
      const token = res.data.token;

      localStorage.setItem("token", token);
      const user = jwtDecode(token);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "employee") navigate("/employee");
      else navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otpArray];
    updatedOtp[index] = value;
    setOtpArray(updatedOtp);
    setOtp(updatedOtp.join(""));
  };

  return (
    <div className="auth-container">
      <h1>{step === 1 ? "Login / Register" : "Enter OTP"}</h1>

      {step === 1 && (
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              // live validation
              if (!value.trim()) {
                setEmailError("Email is required");
              } else if (!emailRegex.test(value.trim())) {
                setEmailError("Please enter a valid email");
              } else {
                setEmailError("");
              }
            }}
            onBlur={() => {
              // final trim + validate on blur
              const trimmed = email.trim();
              setEmail(trimmed);
              if (!trimmed) setEmailError("Email is required");
              else if (!emailRegex.test(trimmed)) setEmailError("Please enter a valid email");
              else setEmailError("");
            }}
            className={emailError ? "input-error" : ""}
            aria-invalid={!!emailError}
            aria-describedby="email-error"
          />
          {emailError && <p id="email-error" className="error-text">{emailError}</p>}

          <ConsentCheckbox checked={agreed} onChange={setAgreed} id="login-consent" />

          <button
            onClick={sendOtp}
            className="login-btn"
            disabled={loading || !!emailError || !email || !agreed}
            title={
              !email || emailError
                ? "Enter a valid email to enable"
                : !agreed
                ? "Please accept the Privacy Policy and Terms & Conditions"
                : "Send OTP"
            }
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-group">

          <div className="otp-container">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                className="otp-box"
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                  e.target.value = cleaned;

                  handleOtpChange(index, cleaned);

                  if (cleaned && index < 5) {
                    document.getElementById(`otp-${index + 1}`).focus();
                  }

                  if (!cleaned && index > 0) {
                    document.getElementById(`otp-${index - 1}`).focus();
                  }
                }}
              />
            ))}
          </div>

          <button
            style={{ marginTop: "20px" }}
            onClick={verifyOtp}
            disabled={loading}
            className="login-btn"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <p style={{ marginTop: "10px" }}>
            {!cooldown ? (
              <>
                Didn’t receive the code?{" "}
                <a onClick={sendOtp} style={{ cursor: "pointer" }}>
                  Resend OTP
                </a>
              </>
            ) : (
              <>
                Resend available in {Math.floor(cooldown / 60)}:
                {String(cooldown % 60).padStart(2, "0")}
              </>
            )}
          </p>
        </div>
      )}

    </div>
  );
};

export default OTPLogin;