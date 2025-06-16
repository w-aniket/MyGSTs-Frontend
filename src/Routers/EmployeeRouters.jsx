import React from 'react'
import ProfileLogo from '../Customer/Components/ProfileLogo/ProfileLogo'
import { Route, Routes } from 'react-router-dom'
import EmployeeLayout from '../Staff/Layout/EmployeeLayout'
import Dashboard from '../Admin/Pages/Dashboard/Dashboard'

const EmployeeRouters = () => {
  return (
    <Routes>
      <Route path='/'
        element={
          <EmployeeLayout>
            <Dashboard />
          </EmployeeLayout>
        }
      />

    </Routes>
  )
}

export default EmployeeRouters