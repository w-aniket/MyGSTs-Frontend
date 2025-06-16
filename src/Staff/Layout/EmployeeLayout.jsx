import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import Navbar from '../NAvbar/Navbar'

const EmployeeLayout = ({ children}) => {
  return (
    <div className='app-container'>
        <Sidebar />
        <div className="main-content">
            <Navbar />
            <div className="content-body">
                {children}
            </div>
        </div>
    </div>
  )
}

export default EmployeeLayout