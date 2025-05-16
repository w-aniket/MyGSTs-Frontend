// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "../Admin/Dashboard/Dashboard.jsx";
// import Sidebar from "../Admin/Sidebar/Sidebar.jsx";
// import Navbar from "../Admin/Navbar/Navbar.jsx";
// import JobPosts from "../Admin/Pages/JobPosts.jsx";

// const AdminRouter = () => {
//   return (
//       <div className="app-container">
//         <Sidebar />
//         <div className="main-content">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/job-posts" element={<JobPosts />} />
//           </Routes>
//         </div>
//       </div>
    
//   );
// };

// export default AdminRouter;
// src/routes/AdminRouter.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Admin/Layout/AdminLayout";
import Dashboard from "../Admin/Pages/Dashboard/Dashboard";
import JobPosts from "../Admin/Pages/JobPosts/JobPosts";

const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AdminLayout><Dashboard /></AdminLayout>}
      />
      <Route
        path="/transactions"
        element={<AdminLayout><JobPosts /></AdminLayout>}
      />

      <Route
        path="/job-posts"
        element={<AdminLayout><JobPosts /></AdminLayout>}
      />

       <Route
        path="/accounts"
        element={<AdminLayout><JobPosts /></AdminLayout>}
      />


      <Route
        path="/payroll"
        element={<AdminLayout><JobPosts /></AdminLayout>}
      />

       <Route
        path="/reports"
        element={<AdminLayout><JobPosts /></AdminLayout>}
      />

       <Route
        path="/settings"
        element={<AdminLayout><JobPosts /></AdminLayout>}
      />
    </Routes>
  );
};

export default AdminRouter;