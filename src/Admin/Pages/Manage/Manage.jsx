import React, { useState } from 'react'
import StaffNavbar from '../../Components/StaffNavbar/StaffNavbar'
import RoleManager from '../../Components/RoleManager/RoleManager'
import LeaderTEamManager from '../../Components/LeaderTeamManager/LeaderTEamManager'
import './ManageStaff.css'
const Manage = () => {
  const [activeTab, setActiveTab] =useState("Role")
  return (
    <div className='manage-staff-page'>
        <StaffNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="tab-content">
          {activeTab === "Role" && <RoleManager />}
          {activeTab === 'Team' && <LeaderTEamManager />}
        </div>
    </div>
  )
}

export default Manage