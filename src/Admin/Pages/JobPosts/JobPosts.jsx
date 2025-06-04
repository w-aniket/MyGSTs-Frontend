import "./JobPosts.css";
import JobPostsTable from "../../Components/JobPosts/JobPostsTable";
import ApplicationsTable from "../../Components/JobApplication/ApplicationsTable";

const JobPosts = () => {
  return (
    <div className="">
      <JobPostsTable />

      <ApplicationsTable />
    </div>
  );
};

export default JobPosts;
