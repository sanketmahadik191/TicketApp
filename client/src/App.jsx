import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useSelector } from "react-redux";
import AdminDashboard from "./Pages/AdminDashboard";
import AgentDashboard from "./Pages/AgentDashboard";
import CustomerDashboard from "./Pages/CustomerDashboard";
import Navbar from "./Components/Navbar";
import TicketsList from "./Components/TicketsList";
import UsersList from "./Components/UsersList";
import UserInfo from "./Components/UserInfo";

export default function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Redirect Root to Login */}
        {/* <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} /> */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : role === "agent" ? (
                <Navigate to="/agent-dashboard" />
              ) : (
                <Navigate to="/customer-dashboard/:id" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />


        {/* Role-Based Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to="tickets" />} />
          <Route path="tickets" element={<TicketsList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="info/:id" element={<UserInfo />} />
          
        </Route>

        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-dashboard/:id"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>


  );
}
