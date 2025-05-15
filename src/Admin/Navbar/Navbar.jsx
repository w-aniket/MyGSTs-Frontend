import React from 'react';
import './Navbar.css';
import ProfileLogo from '../../Customer/Components/ProfileLogo/ProfileLogo';

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <h3>Admin Dashboard</h3>
      <div className="profile-icon">
        <ProfileLogo />
      </div>
    </div>
  );
};

export default Navbar;