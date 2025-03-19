import Inventory from "../models/Inventory.js";

// Mendapatkan daftar inventory (admin & staff)
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Menambahkan barang (hanya admin, sudah divalidasi di route)
export const addInventory = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newItem = await Inventory.create({ name, quantity, price });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan barang" });
  }
};

// Mengupdate barang (hanya admin, sudah divalidasi di route)
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  try {
    const item = await Inventory.findByPk(id);
    if (!item) return res.status(404).json({ message: "Barang tidak ditemukan" });

    await item.update({ name, quantity, price });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui barang" });
  }
};

// Menghapus barang (hanya admin, sudah divalidasi di route)
export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByPk(id);
    if (!item) return res.status(404).json({ message: "Barang tidak ditemukan" });

    await item.destroy();
    res.json({ message: "Barang berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus barang" });
  }
};
