import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx"; 
import Register from "./pages/Register.jsx";
import Inventory from "./pages/Inventory.jsx";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  console.log("App Loaded");

  return (
    <Routes>
      <Route path="/" element={<Navigate to ="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/inventory" element={<Inventory />} /> */}
    </Routes>
  );
}

export default App;
