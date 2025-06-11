import React from "react";
import "./Navbar.css";
import ProfileLogo from "../../Customer/Components/ProfileLogo/ProfileLogo";
import NotificationBell from "../Components/NotificationBell/NotificationBell";

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <h3>Dashboard</h3>
      <div className="admin-navbar-rightside">
          <NotificationBell />
        <div className="profile-icon">
          <ProfileLogo />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
