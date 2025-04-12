import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = ({ email, purpose }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        if (purpose === 'register'){
      const res = await axios.post(`${apiUrl}/auth/register/verify`, {
        email,
        otp,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Successfully Register");
        setTimeout(() => navigate("/"), 900);
      }
    } else if (purpose === 'reset') {
        const res = await axios.post(`${apiUrl}/auth/reset/verify`, {
            email,
            otp,
        });
        if (res.data.success) {
            toast.success("OTP verified. Please enter your new password.");
            setTimeout(() => navigate('/signin/new-password', {state: {email}}), 900);
        }
    }
    } catch (error) {
      console.error(error);
      const errorMessage =
        (await error?.response?.data?.message) || "OTP Verification failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/resendOTP`, {email});
      toast.success(res.data.message);
    } catch (error) {
        console.error(error);
      const errorMessage =
        (await error?.response?.data?.message) || "Failed to sent opt";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleVerifyOtp}>
        <h1>Verify OTP</h1>
        <p className="auth-footer-text">OTP sent to {email}</p>
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            name="otp"
            id="otp"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button id="submit" type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Verify"}
        </button>
        <p className="auth-footer-text">
          OTP not recived?{" "}
          <a onClick={handleResendOTP} >
            resend OTP
          </a>
        </p>
        <p className="auth-footer-text">
          Already have an account?{" "}
          <a onClick={() => navigate("/signin")}>Sign In</a>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Otp;
