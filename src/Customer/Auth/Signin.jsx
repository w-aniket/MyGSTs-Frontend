import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode} from "jwt-decode";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, form);

      const token = response.data.token;
      if (!token) {
        console.log("failed to create token");
      }
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role

      toast.success("Login Successfull");
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 900);
    } catch (error) {
      console.error(error)
      const errorMessage =
        (await error?.response?.data?.message) || "Login Failed";
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

  return (
    <div className="body">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
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
            {loading ? <span className="spinner"></span> : "Login"}
          </button>
          <p>
            Forget your password?{" "}
            <a onClick={() => navigate("reset-password")}>Reset</a>
          </p>
          <p>
            New Client? <a onClick={() => navigate("/signup")}>Register</a>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signin;
