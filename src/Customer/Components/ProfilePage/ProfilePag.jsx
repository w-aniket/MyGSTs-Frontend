import React, { useEffect, useState } from "react";
import "./ProfilePag.css";
import AppliedJob from "./AppliedJob";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import { useLocation, useNavigate } from "react-router-dom";

const ProfilePag = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("appliedjob")) {
      setActiveSection("applied");
    } else if (location.pathname.includes("opportunities")) {
      setActiveSection("opportunities");
    } else {
      setActiveSection("profile");
    }
  }, [location.pathname]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);

    if (section === "profile") {
      navigation("/careers/profile/1");
    } else if (section === "applied") {
      navigation("/careers/appliedjob");
    } else if (section === "opportunities") {
      navigation("/careers/opportunities");
    }
  };

  const imageUrl = false;

  return (
    <div className="profile-page">
      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        &#9776;
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="profile-photo">
          {imageUrl ? (
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              alt="Profile"
            />
          ) : (
            <div className="placeholder"></div>
          )}
        </div>
        <ul className="menu">
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => handleMenuClick("profile")}
          >
            Profile
          </li>
          <li
            className={activeSection === "applied" ? "active" : ""}
            onClick={() => handleMenuClick("applied")}
          >
            My Applied Job
          </li>
          <li
            className={activeSection === "opportunities" ? "active" : ""}
            onClick={() => handleMenuClick("opportunities")}
          >
            More Job Opportunities
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeSection === "profile" && <ProfileDetail />}
        {activeSection === "applied" && <AppliedJob />}
        {activeSection === "opportunities" && <AppliedJob />}
      </div>
    </div>
  );
};

export default ProfilePag;
