import React from 'react'
import { useLocation } from 'react-router-dom';

const AppliedJob = () => {
  const location = useLocation();
  const job = location.state?.job;
  console.log(job, "job");
  return (
    <div>
            
    </div>
  )
}

export default AppliedJob