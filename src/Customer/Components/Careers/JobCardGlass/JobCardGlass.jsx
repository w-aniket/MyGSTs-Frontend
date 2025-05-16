import React from "react";
import {
  FaUserGraduate,
  FaClock,
  FaVenusMars,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./JobCardGlass.css"; // assuming styles are here

import { useNavigate } from "react-router-dom";

const JobCardGlass = ({
  title,
  description,
  qualification,
  experience,
  gender,
  ageLimit,
  deadline,
  skills,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/careers/profile/1");
    setTimeout(() => {
      alert("Complete Profile to apply for this job");
    }, 100);
  };

  return (
    <div className="job-card-glass">
      <h2 className="job-title">{title}</h2>
      <p className="job-description">{description}</p>

      <div className="job-details">
        <p>
          <FaUserGraduate className="icon" />
          <strong>Qualification:</strong>&nbsp;{qualification}
        </p>
        <p>
          <FaClock className="icon" />
          <strong>Experience:</strong>&nbsp;{experience}
        </p>
        <p>
          <FaVenusMars className="icon" />
          <strong>Gender:</strong>&nbsp;{gender}
        </p>
        <p>
          <FaUser className="icon" />
          <strong>Age Limit:</strong>&nbsp;{ageLimit}
        </p>
        <p>
          <FaCalendarAlt className="icon" />
          <strong>Deadline:</strong>&nbsp;{deadline}
        </p>
        <p>
          <FaCheckCircle className="icon" />
          <strong>Skills:</strong>&nbsp;{skills}
        </p>
      </div>

      <button onClick={handleClick} className="apply-btn">
        Apply Now
      </button>
      
    </div>
  );
};

export default JobCardGlass;
