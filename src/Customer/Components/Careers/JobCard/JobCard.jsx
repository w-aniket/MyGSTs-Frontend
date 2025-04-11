import React from "react";
import { FaBriefcase, FaUserGraduate, FaClock, FaVenusMars, FaUser, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import "./JobCard.css";

const JobCard = () => {
  return (
    <div className="job-card-white">
      <div className="job-image">
        <img src="https://source.unsplash.com/300x200/?office,teamwork" alt="Job" />
      </div>

      <div className="job-info">
        <h2>Software Developer</h2>
        <p className="job-description">Build cutting-edge software solutions with us!</p>

        <div className="job-details">
          <p><FaBriefcase className="icon" /> <strong>Job Type:</strong> Full-Time</p>
          <p><FaUserGraduate className="icon" /> <strong>Qualification:</strong> B.Tech / MCA</p>
          <p><FaClock className="icon" /> <strong>Experience:</strong> 2-5 years</p>
          <p><FaVenusMars className="icon" /> <strong>Gender:</strong> Any</p>
          <p><FaUser className="icon" /> <strong>Age Limit:</strong> 22 - 40 years</p>
        </div>

        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;
