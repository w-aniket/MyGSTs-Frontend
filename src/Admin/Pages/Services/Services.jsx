import React from 'react'
import ServiceList from '../../Components/ServiceList/ServiceList'
import AdminServiceRequests from '../../Components/ServiceRequests/AdminServiceRequests'

const Services = () => {
  return (
    <div>
      <AdminServiceRequests />
      <ServiceList />
    </div>
  )
}

export default Services