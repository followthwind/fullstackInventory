// import React from "react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [role, setRole] = useState(localStorage.getItem("role") || "guest");

  useEffect(() => {
    // Update state jika localStorage berubah
    const updateUser = () => {
      setUsername(localStorage.getItem("username") || "Guest");
      setRole(localStorage.getItem("role") || "guest");
    };

    // Cek saat pertama kali komponen dirender
    updateUser();

    // Tambahkan event listener untuk mendengarkan perubahan localStorage
    window.addEventListener("storage", updateUser);

    // Hapus event listener saat komponen di-unmount
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 shadow-md">
      <div className="flex space-x-4">
        <button onClick={() => navigate("/dashboard")} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
          Dashboard
        </button>
        <button onClick={() => navigate("/inventory")} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
          Inventory
        </button>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold">👤 {username}</span>
        <span className="text-sm lowercase">{role}</span> {/* Role ditampilkan kecil */}
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

