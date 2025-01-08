import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import SuperAdminRoutes from "./superAdmin/SuperAdminRoutes";
import AdminRoutes from "./admin/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <SuperAdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;