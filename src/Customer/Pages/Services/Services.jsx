import React from 'react'
import './Services.css'
import { Typewriter } from 'react-simple-typewriter'

const Services = () => {
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
      
    </div>
  )
}

export default Services