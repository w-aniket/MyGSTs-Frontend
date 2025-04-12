import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, form);
      if (response.data.success) {
        setShowOtpInput(true);
      }
    } catch (error) {
      const errorMessage =
        (await error?.response?.data?.message) || "Signup Failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/register/verify`, {
        email: form.email,
        otp,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Successfully Register");
        setTimeout(() => {
          navigate("/");
        }, 900);
      }
    } catch (error) {
      const errorMessage =
        (await error?.response?.data?.message) || "OTP Verification failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleResendOTP = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${apiUrl}/auth/resendOTP`, form)
      toast.success(res.data.message)
    } catch (error) {
      const errorMessage =  (await error?.response?.data?.message) || "Failed to sent opt"
      toast.error(errorMessage);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="body">
      <div className="auth-container">
        {!showOtpInput ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <h1>Sign Up</h1>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button id="submit" type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Sign Up"}
            </button>
            <p className="auth-footer-text">
              Already have an account?{" "}
              <a onClick={() => navigate("/signin")}>Sign In</a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <h1>Verify OTP</h1>
            <p className="auth-footer-text">OTP sent to {form.email}</p>
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
            <p className="auth-footer-text"  >
              OTP not recived?{" "}
              <a onClick={handleResendOTP} aria-disabled={loading}>resend OTP</a>
            </p>
            <p className="auth-footer-text">
              Already have an account?{" "}
              <a onClick={() => navigate("/signin")}>Sign In</a>
            </p>
          </form>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
