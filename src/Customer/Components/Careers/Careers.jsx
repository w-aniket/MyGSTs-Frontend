import React from "react";
import "./Careers.css";
import CareerInrto from "./CareerIntro/CareerInrto";
import JobCard from "./JobCard/JobCard";
import JobCardGlass from "./JobCardGlass/JobCardGlass";

const jobListings = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Develop innovative solutions with our tech team.",
    qualification: "B.Tech / MCA",
    experience: "2-5 years",
    gender: "Any",
    ageLimit: "22-40",
    deadline: "2023-12-31",
    skills: "JavaScript, React, Node.js",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description: "Create stunning user experiences & interfaces.",
    qualification: "B.Des / Any Design Course",
    experience: "1-3 years",
    gender: "Any",
    ageLimit: "22-35",
    deadline: "2023-11-30",
    skills: "Figma, Adobe XD, Sketch",
  },
  {
    id: 3,
    title: "Marketing Manager",
    description: "Lead and execute marketing strategies.",
    qualification: "MBA / Marketing",
    experience: "3-6 years",
    gender: "Any",
    ageLimit: "25-45",
    deadline: "2023-12-15",
    skills: "SEO, Content Marketing, Social Media",
  },
  {
    id: 4,
    title: "Data Analyst",
    description: "Analyze data to drive business decisions.",
    qualification: "B.Tech / B.Sc in Statistics",
    experience: "1-4 years",
    gender: "Any",
    ageLimit: "22-38",
    deadline: "2023-11-20",
    skills: "Python, SQL, Data Visualization",
  },
  {
    id: 5,
    title: "Project Manager",
    description: "Oversee project execution and team management.",
    qualification: "MBA / Project Management",
    experience: "5-8 years",
    gender: "Any",
    ageLimit: "28-50",
    deadline: "2023-12-25",
    skills: "Agile, Scrum, Leadership",
  },
  {
    id: 6,
    title: "Content Writer",
    description: "Craft engaging content for various platforms.",
    qualification: "Any Graduate",
    experience: "0-3 years",
    gender: "Any",
    ageLimit: "20-35",
    deadline: "2023-11-10",
    skills: "Content Writing, SEO, Research",
  },
];

const Careers = () => {
  return (
    <div>
      <CareerInrto showButton={false} reverseLayout={false} />
      {/* <JobCard />
      <JobCardGlass /> */}
      <div className="career-page">
        <h1 className="career-heading">Career Opportunities</h1>
        <div className="job-listings">
          {jobListings.map((job) => (
            <div key={job.id} className="job-card-wrapper">
              <JobCardGlass {...job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
