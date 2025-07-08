import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Otp from "./Otp";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Reset = () => {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/reset`, { email });
      if (res.data.success) {
        setShowOtpInput(true);
      }
    } catch (error) {
      console.error("error is ", error);
      toast.error(error?.response?.data?.message || "Failed to send Otp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="auth-container">
        {!showOtpInput ? (
          <>
            <h1>Forget Password</h1>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <button id="submit" type="submit" disabled={loading}>
                {loading ? <span className="spinner"></span> : "Submit"}
              </button>
              <p className="auth-footer-text">
                Already have an account?
                <a onClick={() => navigate("/signin")}>Login</a>
              </p>
            </form>
          </>
        ) : (
          <Otp email={email} purpose="reset" />
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Reset;
