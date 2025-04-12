import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const NewPassword = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const { state } = useLocation();
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
        toast.error("Password And Confirm should be Same")
        return;
    }

    try {
        setLoading(true)
    
        const res = await axios.post(`${apiUrl}/auth/reset/new-password`, {
            email: state.email,
            password,
            confirmPassword
        });
        toast.success("Password reset successfully.")
        setTimeout(() => navigate('/signin'), 900);
    } catch (error) {
        console.error(error)
        toast.error("Failed to reset password")
    }finally {
        setLoading(false)
    }
  };


  return (
    <div className="body">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Set New Password</h1>
          <div className="form-group">
            <label htmlFor="newPassword">New password</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Confirm new password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </div>
          <button id="submit" type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Reset"}
            </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default NewPassword;
