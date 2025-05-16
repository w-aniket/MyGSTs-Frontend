import React from 'react';
import './JobCard.css';

const JobCard = ({ ...job }) => {
  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>
      <p className="job-description">{job.description}</p>
      <div className="job-details">
        <p><strong>Qualification:</strong> {job.qualification}</p>
        <p><strong>Age:</strong> {job.age}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        <p><strong>Gender:</strong> {job.gender}</p>
        <p><strong>Skills:</strong> {job.skills}</p>
        <p><strong>Deadline:</strong> {job.deadline}</p>
      </div>
    </div>
  );
};

export default JobCard;
