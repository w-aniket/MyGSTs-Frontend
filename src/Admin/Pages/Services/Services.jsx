import React from 'react'
import ServiceList from '../../Components/ServiceList/ServiceList'
import AdminServiceRequests from '../../Components/ServiceRequests/AdminServiceRequests'
import ServiceRequestList from '../../Components/ServiceRequestsList/ServiceRequestsList'

const Services = () => {
  return (
    <div>
      {/* <AdminServiceRequests /> */}
      <ServiceRequestList />
      <ServiceList />
    </div>
  )
}

export default Services