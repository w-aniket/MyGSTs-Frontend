import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import './Services.css';
import ServiceCard from '../../../Components/ServiceCard/ServiceCard';
import axios from 'axios';

const Services = () => {
  const navigate = useNavigate();

    const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
      axios.get(`${apiUrl}/api/services`)
      .then((res) => {
        console.log("servise", res.data.services)
        setServices(res.data.services.slice(0,6))
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  },[])

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
        {services.map(service => (
        <ServiceCard key={service._id}
            title={service.title}
            icon={service.icon || "🔧"}
            iconbg={service.iconbg || "#e0e0e0"}
            features={service.features || []}
            serviceId={service._id}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;

//       <div className="main-services-container ">
//         {services.map((service) => (
//           <ServiceCard key={service._id}
//             title={service.title}
//             icon={service.icon || "🔧"}
//             iconbg={service.iconbg || "#e0e0e0"}
//             features={service.features || []}
//           />
//         ))}
//       </div>

      
