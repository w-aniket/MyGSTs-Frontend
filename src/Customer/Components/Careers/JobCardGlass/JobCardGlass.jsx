import React from "react";
import { FaBriefcase, FaUserGraduate, FaClock, FaVenusMars, FaUser, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import "./JobCardGlass.css";
import { useNavigate } from "react-router-dom";

const JobCardGlass = ({
    title,
    description,
    jobType,
    qualification,
    experience,
    gender,
    ageLimit,
    deadline,
    skills,
  }) => {
    const navigate = useNavigate();

    const handleCilck = () => {
     
      navigate("/careers/profile/1");
      
      setTimeout(() => {
        alert("Complete Profile to apply for this job");
      }, 100);
    }

  return (
    <div className="job-card-unique">
    <div className="job-title-ribbon">
      <h2>{title}</h2>
    </div>

    <div className="job-content">
      <p className="job-description">{description}</p>

      <div className="job-details">
        <div className="heading-centre">
        <p>
          <FaBriefcase className="icon" /> <strong>Job Type:</strong> {title}
        </p>
        </div>
        <p>
          <FaUserGraduate className="icon" /> <strong>Qualification:</strong>{" "}
          {qualification}
        </p>
        <p>
          <FaClock className="icon" /> <strong>Experience:</strong> {experience}
        </p>
        <p>
          <FaVenusMars className="icon" /> <strong>Gender:</strong> {gender}
        </p>
        <p>
          <FaUser className="icon" /> <strong>Age Limit:</strong> {ageLimit}
        </p>
        <p>
          <FaCalendarAlt className="icon" /> <strong>Deadline:</strong> {deadline}
        </p>
        <p>
          <FaCheckCircle className="icon" /> <strong>Skills:</strong> {skills}
        </p>
      </div>

      <button onClick={ handleCilck} className="apply-btn">Apply Now</button>
    </div>
  </div>
  );
};

export default JobCardGlass;
