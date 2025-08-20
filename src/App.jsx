import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import ScrollToTop from "./Customer/Components/ScrollToTop";
import { UserContext } from "./UserContex/UserContext";
import { useContext } from "react";
import AdminRouter from "./Routers/AdminRouter";
import EmployeeRouters from "./Routers/EmployeeRouters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Component/Loader/Loader";

function App() {
  const { user, loadingUser } = useContext(UserContext);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<CustomerRouters />} />
        <Route
          path="/admin/*"
          element={
            user && user?.role === "admin" ? (
              <AdminRouter />
            ) : (
              <Navigate to="/" state={{ from: "/admin" }} replace />
            )
          }
        />

        <Route
          path="/employee/*"
          element={
            user &&
            (user.role === "employee" ||
              user.role === "leader" ||
              user.role === "admin") ? (
              <EmployeeRouters />
            ) : (
              <Navigate to="/" state={{ from: "/employee" }} replace />
            )
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

      {loadingUser && (
        <div className="loading-overlay">
          <Loader /> {/* Try "wave" | "typing" | "shimmer" */}
        </div>
      )}
    </>
  );
}

export default App;
