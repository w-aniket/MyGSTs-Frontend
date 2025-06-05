import React from 'react'

const ServiceCard = ({title, icon, iconbg, features}) => {
  return (
    <div className='main-service-card' style={{boxShadow: `2px 2px 1px 1px ${iconbg}80`}}>
        <div className="main-service-header">

        <div className="icon-circle" style={{backgroundColor: iconbg}}>
            <span className="icon">{icon}</span>
        </div>
        <a href="#">
          <span className="external-icon">🔗</span>
        </a>
        </div>
        <h3 className='main-service-title'>{title}</h3>
        <ul className='main-service-features'>
            {features.map((feature, idx) => <li key={idx}>{feature}</li>)}
        </ul>
    </div>
  )
}

export default ServiceCard