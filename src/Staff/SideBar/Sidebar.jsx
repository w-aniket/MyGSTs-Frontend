import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
          <li><Link to="/employee" onClick={() => setSidebarOpen(false)}>Dashboard</Link></li>
          {/* <li><Link to="/employee/team" onClick={() => setSidebarOpen(false)}>Team</Link></li> */}
          {/* <li><Link to="/admin/job-posts" onClick={() => setSidebarOpen(false)}>Job Posts</Link></li> */}
          {/* <li><Link to="/admin/transactions" onClick={() => setSidebarOpen(false)}>Transactions</Link></li> */}
          {/* <li><Link to="/admin/accounts" onClick={() => setSidebarOpen(false)}>Accounts</Link></li> */}
          {/* <li><Link to="/admin/payroll" onClick={() => setSidebarOpen(false)}>Payroll</Link></li> */}
          {/* <li><Link to="/admin/reports" onClick={() => setSidebarOpen(false)}>Reports</Link></li> */}
          {/* <li><Link to="/admin/settings" onClick={() => setSidebarOpen(false)}>Settings</Link></li> */}
          <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
