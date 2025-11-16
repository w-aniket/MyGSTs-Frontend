import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Admin/Layout/AdminLayout";
import Dashboard from "../Admin/Pages/Dashboard/Dashboard";
import JobPosts from "../Admin/Pages/JobPosts/JobPosts";
import ProfileView from "../Customer/Components/ProfilePage/ProfileDetail/ProfileView";
import Services from "../Admin/Pages/Services/Services";
import Manage from "../Admin/Pages/Manage/Manage";
import Notification from "../Admin/Pages/Notification/Notification";
import ContactRequests from "../Admin/Pages/ContactRequests/ContactRequests";
import ContactDetail from "../Admin/Pages/ContactRequests/ContactDetail";

const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <AdminLayout>
            <JobPosts />
          </AdminLayout>
        }
      />

      <Route
        path="/services"
        element={
          <AdminLayout>
            <Services />
          </AdminLayout>
        }
      />

      <Route
        path="/job-posts"
        element={
          <AdminLayout>
            <JobPosts />
          </AdminLayout>
        }
      />

      <Route
        path="/accounts"
        element={
          <AdminLayout>
            <JobPosts />
          </AdminLayout>
        }
      />

      <Route
        path="/payroll"
        element={
          <AdminLayout>
            <JobPosts />
          </AdminLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <AdminLayout>
            <JobPosts />
          </AdminLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <AdminLayout>
            <JobPosts />
          </AdminLayout>
        }
      />

      <Route
        path="profile/:id"
        element={
          <AdminLayout>
            <ProfileView />
          </AdminLayout>
        }
      />

      <Route
        path="/manage"
        element={
          <AdminLayout>
            <Manage />
          </AdminLayout>
        }
      />

      <Route
        path="/contact-requests"
        element={
          <AdminLayout>
            <ContactRequests />
          </AdminLayout>
        }
      />

      <Route
        path="/contact-requests/:id"
        element={
          <AdminLayout>
            <ContactDetail />
          </AdminLayout>
        }
      />

      <Route
        path="/notifications"
        element={
          <AdminLayout>
            <Notification />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default AdminRouter;
