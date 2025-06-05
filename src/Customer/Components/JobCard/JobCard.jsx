import React from "react";
import {
  FaUserGraduate,
  FaClock,
  FaVenusMars,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./JobCard.css"; // assuming styles are here

import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobCard = ({
  _id,
  title,
  description,
  qualifications,
  experience,
  // gender,
  ageLimit,
  deadline,
  skills,
}) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
      return
    }

    try {
      const res = await axios.get(`${apiUrl}/api/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`},
      })
      navigate (`/careers/profile?apply=true&jobId=${_id}`, {
      })
    } catch (error) {
      console.error("Invalid User:",  error.response?.data);
    }

  };

  return (
    <div className="job-card-glass">
      <h2 className="job-title">{title}</h2>
      <p className="job-description">{description}</p>

      <div className="job-details">
        <p>
          <FaUserGraduate className="icon" />
          <strong>Qualification:</strong>&nbsp;{qualifications}
        </p>
        <p>
          <FaClock className="icon" />
          <strong>Experience:</strong>&nbsp;{experience}
        </p>
        {/* <p>
          <FaVenusMars className="icon" />
          <strong>Gender:</strong>&nbsp;{gender}
        </p> */}
        <p>
          <FaUser className="icon" />
          <strong>Age Limit:</strong>&nbsp;{ageLimit}
        </p>
        <p>
          <FaCalendarAlt className="icon" />
          <strong>Deadline:</strong>&nbsp;{deadline.split("T")[0]}
        </p>
        <p>
          <FaCheckCircle className="icon" />
          <strong>Skills:</strong>&nbsp;{skills}
        </p>
      </div>

      <button onClick={handleClick} className="apply-btn">
        Apply
      </button>
      
    </div>
  );
};

export default JobCard;
