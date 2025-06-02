import axios from "axios";
import React, { useEffect, useState } from "react";
import { use } from "react";
import "./AppliedJob.css";
import { Link } from "react-router-dom";

const AppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/user/applied-jobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data?.applications);

        setAppliedJobs(res.data.applications || []);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="applied-jobs-container">
      <h2>My Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <div className="applied-jobs-list">
          {appliedJobs.map((app) => (
            <div className="job-card" key={app._id}>
              <div className="job-card-header">
                <h3>{app.jobId?.title}</h3>
                <span className="job-location">{app.jobId?.location}</span>
              </div>
              <p className="applied-date">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
              <Link
                className="view-profile-link"
                to="/careers/profile"
                rel="noopener noreferrer"
              >
                View Your Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJob;
