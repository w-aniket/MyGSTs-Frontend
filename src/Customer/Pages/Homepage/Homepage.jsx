import React from 'react';
import './Homepage.css';
import Services from './ServicesPanel/Services.jsx';
import CareerInrto from '../Careers/CareerIntro/CareerInrto.jsx';
import Contact from '../ContactV2/Contact.jsx';

const Homepage = () => {
  return (
    <div>
      <IntroImag />
      <Services />
      <CareerInrto showButton={true} reverseLayout={true} />
      <Contact  />
    </div>
  );
};

export default Homepage;
