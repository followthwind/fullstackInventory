import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use(authRoutes);
app.use(inventoryRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database terhubung!");
    app.listen(5000, () => console.log("Server berjalan di http://localhost:5000"));
  } catch (error) {
    console.error("Gagal menghubungkan database:", error);
  }
};

startServer();
