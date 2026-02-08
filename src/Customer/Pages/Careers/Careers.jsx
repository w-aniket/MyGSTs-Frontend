import React, { useEffect, useState } from "react";
import "./Careers.css";
import CareerInrto from "../../Components/CareerIntro/CareerInrto";
import axios from "axios";
import JobCard from "../../Components/JobCard/JobCard";
import { Helmet } from "react-helmet-async";

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
      {/* 🔥 SEO START */}
      <Helmet>
        <title>Careers at MyGSTs | Jobs in GST, Tax & Compliance</title>

        <meta
          name="description"
          content="Explore career opportunities at MyGSTs. Apply for jobs in GST filing, taxation, accounting, compliance, and digital CA services in India."
        />

        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MyGSTs",
            "url": "https://www.mygsts.in",
            "description":
              "Digital CA platform offering GST filing, ITR filing, accounting, and compliance services in India",
            "sameAs": [],
          })}
        </script>
      </Helmet>
      {/* 🔥 SEO END */}

      <div className="page-container">
        <CareerInrto showButton={false} reverseLayout={false} />

        <div className="career-page">
          <h1 className="career-heading">
            Career Opportunities at MyGSTs
          </h1>

          <div className="job-listings">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="job-card-wrapper">
                  <JobCard {...job} />
                </div>
              ))
            ) : (
              <p className="no-jobs-text">
                Currently, there are no open positions. Please check back later.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
