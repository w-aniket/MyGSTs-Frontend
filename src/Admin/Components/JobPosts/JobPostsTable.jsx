import axios from "axios";
import React, { useEffect, useState } from "react";
import AddJobModel from "../JobModel/AddJobModel";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";

const JobPostsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
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

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
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
    </>
  );
};

export default JobPostsTable;
