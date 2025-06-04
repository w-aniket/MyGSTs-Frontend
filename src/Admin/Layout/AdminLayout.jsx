// src/admin/layouts/AdminLayout.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
