import React from 'react'

const tabs = [ 'Role', 'Team'];

const StaffNavbar = ({activeTab, setActiveTab}) => {
  return (
    <div className='staff-navbar'>
        {tabs.map((tab) => (
            <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
            >
                {tab}
            </button>
        ))}
    </div>
  )
}

export default StaffNavbar