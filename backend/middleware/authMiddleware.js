import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Akses ditolak!" });

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid!" });

    // Pastikan token memiliki informasi role
    if (!user.role) return res.status(403).json({ message: "Role tidak ditemukan!" });

    req.user = user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Hanya admin yang diperbolehkan!" });
  }
  next();
};
