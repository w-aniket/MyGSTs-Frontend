import React, { useEffect, useState } from "react";
import "./Careers.css";
import CareerInrto from "../../Components/CareerIntro/CareerInrto";
import axios from "axios";
import JobCard from "../../Components/JobCard/JobCard";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function fetchJobs() {
    try {
      const res = await axios.get(`${apiUrl}/api/public/jobs`);
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <div className="page-container">
      <CareerInrto showButton={false} reverseLayout={false} />
        <div className="career-page">
          <h1 className="career-heading">Career Opportunities</h1>
          <div className="job-listings">
            {jobs.map((job) => (
              <div key={job._id} className="job-card-wrapper">
                <JobCard {...job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
