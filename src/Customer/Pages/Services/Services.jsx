import React, { useEffect, useState } from 'react'
import './Services.css'
import { Typewriter } from 'react-simple-typewriter'
import ServiceCard from '../../Components/ServiceCard/ServiceCard'
import axios from 'axios'

const Services = () => {
  const [services, setServices] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {
      axios.get(`${apiUrl}/api/services`).then((res) => {
        setServices(res.data.services);
      });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },[])

  return (
    <div>
      <div className="services-intro-word">
        <h2>
           <Typewriter
                      words={['Who We Are', 'What We Do', 'Built for Entrepreneurs, by Experts']}
                      loop={true}
                      cursor
                      cursorStyle="|"
                      typeSpeed={30}
                      deleteSpeed={30}
                      delaySpeed={2000}
                    />
        </h2>
        <p>
        We are India’s fast-growing business revival consultancy, offering a digital CA services platform designed to support entrepreneurs, startups, and industry professionals in launching and expanding their businesses seamlessly and affordably.
        </p>

      </div>

      <div className="main-services-container">
        {services.map((service) => (
          <ServiceCard key={service._id} 
            title={service.title}
            icon={service.icon || "🔧"} // Default icon if none provided
            iconbg={service.iconbg || "#e0e0e0"}
            features={service.features || []}
            serviceId={service._id}

          />
        ))}

      </div>
      
    </div>
  )
}

export default Services