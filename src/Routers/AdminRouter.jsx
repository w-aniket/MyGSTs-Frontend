import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Admin/Dashboard/Dashboard.jsx";
import Sidebar from "../Admin/Sidebar/Sidebar.jsx";
import Navbar from "../Admin/Navbar/Navbar.jsx";
import Navigation from "../Customer/Components/Navigation/Navigation.jsx";

const AdminRouter = () => {
  return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          {/* <Navigation /> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    
  );
};

export default AdminRouter;
