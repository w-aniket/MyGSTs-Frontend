import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};
  return (
    <>
      <button className="admin-hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      

      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/admin" onClick={() => setSidebarOpen(false)}>Dashboard</Link></li>
          <li><Link to="/admin/services" onClick={() => setSidebarOpen(false)}>Services</Link></li>
          <li><Link to="/admin/job-posts" onClick={() => setSidebarOpen(false)}>Job Posts</Link></li>
          <li><Link to="/admin/manage" onClick={() => setSidebarOpen(false)}>Manage</Link></li>
          <li><Link to="/admin/course-applications" onClick={() => setSidebarOpen(false)}>Course Applications</Link></li>
          <li><Link to="/admin/contact-requests" onClick={() => setSidebarOpen(false)}>Contact Requests</Link></li>
          <li><Link to="/admin/support" onClick={() => setSidebarOpen(false)}>Support</Link></li>
          {/* <li><Link to="/admin/accounts" onClick={() => setSidebarOpen(false)}>Accounts</Link></li> */}
          {/* <li><Link to="/admin/payroll" onClick={() => setSidebarOpen(false)}>Payroll</Link></li> */}
          {/* <li><Link to="/admin/reports" onClick={() => setSidebarOpen(false)}>Reports</Link></li> */}
          <li><Link to="/admin/settings" onClick={() => setSidebarOpen(false)}>Settings</Link></li>
          <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
