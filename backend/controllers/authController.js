import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: "User berhasil dibuat!" });
  } catch (err) {
    res.status(400).json({ message: "Gagal membuat user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Password salah" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token, username: user.username, role: user.role });
};
