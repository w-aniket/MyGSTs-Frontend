import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadFile } from "../../../Utils/Download";

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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
    fetchApplications();
  }, []);

  return (
    <>
      <div style={{ marginTop: "48px" }} className="job-posts-header">
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
                        onClick={() =>
                          downloadFile(
                            app.user.resume,
                            `${app.user?.fullName}-resume.pdf`
                          )
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    ) : (
                      "Not Uploaded"
                    )}
                  </td>
                  <td>status work pending</td>

                  <td>
                    <button
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
                <td colSpan="5">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationsTable;
