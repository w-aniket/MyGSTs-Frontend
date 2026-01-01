import React from 'react';
import IntroImage from './IntroImage/Introimage.jsx';
import Services from './ServicesPanel/Services.jsx';
import Contact from '../../Pages/ContactV2/Contact.jsx';
import CareerInrto from '../../Components/CareerIntro/CareerInrto.jsx';
import WhyChooseUs from '../../../Component/WhyChooseUs/WhyChooseUs.jsx';
import HowItWorks from '../../../Component/HowItWorks/HowItWorks.jsx';

const Homepage = () => {
  return (
    <div>
      <IntroImage />
      <div className="page-container">
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <CareerInrto showButton={true} reverseLayout={true} />
      <Contact />
      </div>
    </div>
  );
};

export default Homepage;
