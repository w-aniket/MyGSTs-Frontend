import React, { useContext } from 'react';
import './Introimage.css';
import introImage from '../../../../assets/intro-image.jpg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../UserContex/UserContext';

const intro = () => {
  const {user} = useContext(UserContext)
  return (
    <div className="intro-container">
      <div className="intro-image">
        <img src={introImage} alt="Ganesh Accounting - Accounting Made Easy" />
      </div>
      <div className="intro-text">
        {user ? (<>
        <h1>Service Requests</h1>
        <p>Track your service requests</p>
        {/* <button className=''>View</button> */}
        <Link className='my-service-requestes-link' to="/my-service-requests">Track</Link></>):(
          <>
          <h1>Ganesh Accounting</h1>
          <p>Accounting made easy</p>
          <p>We are here to help you</p>
          </>
        )}
      </div>
    </div>
  );
};

export default intro;
