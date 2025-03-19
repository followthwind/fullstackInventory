import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
