import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import './Services.css';

const servicesList = [
  { id: 1, href:'#', title: 'Service 1', imgSrc: 'https://cdn.corporatefinanceinstitute.com/assets/accounting-1024x683.jpeg', alt: 'Service 1 Image' },
  { id: 2, href:'#', title: 'Service 2', imgSrc: 'https://cdn.corporatefinanceinstitute.com/assets/accounting-1024x683.jpeg', alt: 'Service 2 Image' },
  { id: 3, href:'#', title: 'Service 3', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-af0A7H3MUkwHlk0oI29hOBDLva5nwNiyA&s  ', alt: 'Service 3 Image' },
  { id: 4, href:'#', title: 'Service 4', imgSrc: 'https://cdn.corporatefinanceinstitute.com/assets/accounting-1024x683.jpeg', alt: 'Service 1 Image' },
  { id: 5, href:'#', title: 'Service 5', imgSrc: 'https://cdn.corporatefinanceinstitute.com/assets/accounting-1024x683.jpeg', alt: 'Service 2 Image' },
  { id: 6, href:'#', title: 'Service 6', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-af0A7H3MUkwHlk0oI29hOBDLva5nwNiyA&s  ', alt: 'Service 3 Image' },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className='services-container'>
      <div className="services-header">
        <h1>
        <Typewriter
            words={['Our Services', 'Best Solutions', 'Expert Support']}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={30}
            deleteSpeed={30}
            delaySpeed={1000}
          />
        </h1>
        <button onClick={() => navigate('/services')}>See All Services</button>
      </div>

      <div className="services-cards">
        {servicesList.map(service => (
        <div key={service.id} onClick={() => navigate(service.href)} className="service-card">
            <img src={service.imgSrc} alt={service.alt} />
            <h2>{service.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
