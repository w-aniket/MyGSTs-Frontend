import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../UserContex/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileLogo = () => {
  const dropdownRef = useRef(null);
  const { user, loadingUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const signout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="profile-menu" ref={dropdownRef}>
      <button
        className="profile-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p>{user?.email.trim().charAt(0).toUpperCase()}</p>
      </button>
      <div className={`profile-dropdown ${isDropdownOpen ? "show" : ""}`}>
        <a onClick={() => navigate("/careers/profile") || setIsDropdownOpen(false)}>
          Your Profile
        </a>
        <a onClick={() => navigate("/support/tickets") || setIsDropdownOpen(false)}>
          Support Tickets
        </a>
        {user.role === "admin" && (
          <>
            <a onClick={() => navigate("/admin")}>Admin Dashboard</a>
          </>
        )}

        {(user.role === "employee" || user.role === "leader") && (
          <>
            <a onClick={() => navigate("/employee")}>Employee Dashboard</a>
          </>
        )}

        <a className="sign-out" onClick={signout}>Sign Out</a>
      </div>
    </div>
  );
};

export default ProfileLogo;
