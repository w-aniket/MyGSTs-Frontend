import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadFile } from "../../../Utils/Download";
import { toast } from "react-toastify";
import SearchFilter from "../SearchFilter/SearchFilter";
import Pagination from "../Pagination/Pagination";


const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();



  useEffect(() => {


  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
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
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) =>{
    const fullName = app.user?.fullName.toLowerCase() || "";
    const jobTitle = app.jobId?.title?.toLowerCase() || "";
    const email = app.user?.email.toLowerCase() || "";
    return (
        fullName.includes(searchTerm.toLowerCase()) ||
        jobTitle.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase())
    )
});

  const totalPages = Math.ceil(
    filteredApplications.length / applicationsPerPage
  );
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  );

  return (
    <>
      <div style={{ marginTop: "48px" }} className="job-posts-header">
        <h2>Job Applications</h2>
      </div>
        <SearchFilter
          searchTerm={searchTerm}
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
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
            {loading ? (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6}>{error}</td>
              </tr>
            ) : filteredApplications.length > 0 ? (
              paginatedApplications.map((app) => (
                <tr key={app._id}>
                  <td data-label="Candidate" >{app.user?.fullName}</td>
                  <td data-label="Job Title" >{app.jobId?.title}</td>
                  <td data-label="Email" >{app.user?.email}</td>
                  <td data-label="Resume" >
                    {app.user?.resume ? (
                      <button className="download-resume-btn"
                        onClick={() =>
                          downloadFile(
                            app.user.resume,
                            `${app.user?.fullName}-resume.pdf`
                          )
                        }
                      >
                        Download
                      </button>
                    ) : (
                      "Not Uploaded"
                    )}
                  </td>
                  <td data-label="Status" >pending</td>

                  <td data-label="View Profile" >
                    <button className="view-profile-btn"
                      onClick={() =>
                        navigate(`/admin/profile/${app.user?._id}`, {
                          state: { profile: app.user },
                        })
                      }
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No matching applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  );
};

export default ApplicationsTable;
