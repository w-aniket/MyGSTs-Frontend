import React from 'react'
import './SkeletonServiceCard.css'

const SkeletonServiceCard = () => {
  return (
    <div className='skeleton-card'>
        <div className="skeleton-icon"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
    </div>
  )
}

export default SkeletonServiceCard      