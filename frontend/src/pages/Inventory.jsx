import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.id.toString().includes(searchId)
  );


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      alert("Harap login terlebih dahulu!");
      navigate("/login");
      return;
    }

    if (role !== "admin") {
      alert("Hanya admin yang bisa mengakses halaman ini!");
      navigate("/dashboard");
      return;
    }

    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      alert("Harap isi semua field!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, quantity, price }),
      });

      if (response.ok) {
        setName("");
        setQuantity("");
        setPrice("");
        fetchItems();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Yakin ingin menghapus barang ini?")) return;
    try {
      await fetch(`http://localhost:5000/inventory/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      alert("Harap isi semua field!");
      return;
    }
    try {
      await fetch(`http://localhost:5000/inventory/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, quantity, price }),
      });

      setName("");
      setQuantity("");
      setPrice("");
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-blue-500 to-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-4/5">
          <h2 className="text-2xl font-bold text-center mb-4">Inventory</h2>
          <div className="mb-4 flex space-x-4">
          
        </div>
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

          {/* Form Tambah/Edit Barang */}
          <form onSubmit={editingItem ? handleEditItem : handleAddItem} className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Nama Barang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Jumlah"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              {editingItem ? "Update Barang" : "Tambah Barang"}
            </button>
          </form>

           {/* Tabel Barang */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">Jumlah</th>
            <th className="border border-gray-300 px-4 py-2">Harga</th>
            <th className="border border-gray-300 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">Rp {item.price}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setName(item.name);
                      setQuantity(item.quantity);
                      setPrice(item.price);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-gray-500 p-4 text-center">Tidak ada barang tersedia.</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      </div>
    </>
  );
};

export default Inventory;
