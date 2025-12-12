import React from "react";
import "./Navbar.css";
import ProfileLogo from "../../Customer/Components/ProfileLogo/ProfileLogo";
import NotificationBell from "../Components/NotificationBell/NotificationBell";
import Full_Logo from "../../assets/Full_Logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="admin-navbar">
      <Link to="/" className="navbar-logo">
        <img src={Full_Logo} alt="Logo" />
      </Link>
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
