import axios from "axios";
import React, { useEffect, useState } from "react";
import AddJobModel from "../JobModel/AddJobModel";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import SearchFilter from "../SearchFilter/SearchFilter";
import Pagination from "../Pagination/Pagination";


const JobPostsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;


    const searchFields = ["title", "status"];
  const filterdJobs = jobs.filter((job) =>
    searchFields.some((field) => 
        job[field]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filterdJobs.length / jobsPerPage);
  const paginatedJobs = filterdJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  )

  const fetchJobs = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

        <SearchFilter searchTerm={searchTerm} onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1)
        }}

        />
      <div className="job-table-wrapper">
        <table className="jobtable">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3}>Loading...</td>
              </tr>
            ) : filterdJobs.length > 0 ? (
              paginatedJobs.map((job) => {
                return (
                  <tr key={job._id}>
                    <td data-label="Title" >{job.title}</td>
                    <td data-label="Status" >
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
                    <td data-label="Action" >
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
                <td colSpan="3">No matching jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
        />

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
