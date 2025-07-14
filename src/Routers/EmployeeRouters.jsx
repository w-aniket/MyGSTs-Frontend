import React from 'react'
import ProfileLogo from '../Customer/Components/ProfileLogo/ProfileLogo'
import { Route, Routes } from 'react-router-dom'
import EmployeeLayout from '../Staff/Layout/EmployeeLayout'
import EmployeeDashboard from '../Employee/Pages/EmployeeDashboard'

const EmployeeRouters = () => {
  return (
    <Routes>
      <Route path='/'
        element={
          <EmployeeLayout>
            <EmployeeDashboard />
          </EmployeeLayout>
        }
      />

    </Routes>
  )
}

export default EmployeeRouters