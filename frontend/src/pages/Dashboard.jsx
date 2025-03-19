import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect jika tidak ada token
      return;
    }
    fetchInventory();
  }, [navigate, token]);

  const fetchInventory = async () => {
    const res = await fetch("http://localhost:5000/inventory", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setInventory(data);
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.id.toString().includes(searchId)
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Navbar /> {/* Gunakan Navbar */}

      {/* Konten Dashboard */}
      <div className="mt-20 flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-4">Daftar Barang</h2>

        {/* Search Bars */}
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Cari berdasarkan Nama"
            className="p-2 border border-gray-300 rounded"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cari berdasarkan ID"
            className="p-2 border border-gray-300 rounded"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        {/* Tabel Barang */}
        <div className="bg-white p-6 rounded-lg shadow-md w-3/4 text-center">
          {filteredInventory.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Nama Barang</th>
                  <th className="border border-gray-300 px-4 py-2">Jumlah</th>
                  <th className="border border-gray-300 px-4 py-2">Harga</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">Rp {item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Tidak ada barang tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
