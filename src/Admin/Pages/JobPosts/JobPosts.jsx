import axios from "axios";
import React, { useEffect, useState } from "react";
import "./JobPosts.css";
import AddJobModel from "../../Components/JobModel/AddJobModel";
import { toast } from "react-toastify";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import { downloadFile } from "../../../Utils/Download";
import { useNavigate } from "react-router-dom";

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchJobs = async () => {
    try {
      const responce = await axios.get(`${apiUrl}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(responce?.data?.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(res.data.applications || []);
      console.log(res.data.applications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const ConfirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/jobs/${jobToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Job deleted Successfully!");
      setJobToDelete(null);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete Job");
    }
  };

  return (
    <div className="content">
      <div className="job-posts-header">
        <h2>Job Post</h2>
        <button className="add-job-btn" onClick={() => setShowModel(true)}>
          + Add Job
        </button>
      </div>

      <div className="job-table-wrapper">
        <table className="jobtable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => {
                return (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>
                      <span
                        className={
                          job.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setJobToEdit(job);
                          setShowModel(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => setJobToDelete(job._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">No Job posts Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

            <div style={{marginTop:"48px"}} className="job-posts-header">

      <h2>Job Applications</h2>
            </div>
      <div className="application-table-wrapper">
        <table className="jobtable">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Status</th>
              <th>View Profile</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.user?.fullName}</td>
                  <td>{app.jobId?.title}</td>
                  <td>{app.user?.email}</td>
                  <td>
                    {app.user?.resume ? (
                      <a
                        onClick={() => downloadFile(app.user.resume,`${app.user?.fullName}-resume.pdf`)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    ) : (
                      "Not Uploaded"
                    )}
                  </td>
                  <td>
                    status work pending
                  </td>

                  <td>
                   <button
                    onClick={() => navigate(`/admin/profile/${app.user?._id}`, { state: { profile: app.user}})}
                   >
                    View Profile
                   </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModel && (
        <AddJobModel
          onClose={() => {
            setShowModel(false);
            setJobToEdit(null);
          }}
          onJobAdded={fetchJobs}
          jobToEdit={jobToEdit}
        />
      )}

      {jobToDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this job?"
          onConfirm={ConfirmDelete}
          onCancel={() => setJobToDelete(null)}
        />
      )}
    </div>
  );
};

export default JobPosts;
