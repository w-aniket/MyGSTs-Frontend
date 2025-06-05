import React from 'react';
import './Introimage.css';
import introImage from '../../../../assets/intro-image.jpg';

const intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-image">
        <img src={introImage} alt="Ganesh Accounting - Accounting Made Easy" />
      </div>
      <div className="intro-text">
        <h1>Ganesh Accounting</h1>
        <p>Accounting made easy</p>
        <p>We are here to help you</p>
      </div>
    </div>
  );
};

export default intro;
