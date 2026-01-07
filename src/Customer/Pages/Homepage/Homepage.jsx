import React, { useEffect } from 'react';
import IntroImage from './IntroImage/Introimage.jsx';
import Services from './ServicesPanel/Services.jsx';
import Contact from '../../Pages/ContactV2/Contact.jsx';
import CareerInrto from '../../Components/CareerIntro/CareerInrto.jsx';
import WhyChooseUs from '../../../Component/WhyChooseUs/WhyChooseUs.jsx';
import HowItWorks from '../../../Component/HowItWorks/HowItWorks.jsx';
import { useLocation } from 'react-router-dom';

const Homepage = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div>
      <IntroImage />
      <div className="page-container">
      <Services />
      <WhyChooseUs />
      <div id='how-it-works'><HowItWorks /></div>
      <CareerInrto showButton={true} reverseLayout={true} />
      <Contact />
      </div>
    </div>
  );
};

export default Homepage;
