import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nama database
    process.env.DB_USER, // User PostgreSQL
    process.env.DB_PASSWORD, // Password PostgreSQL
    {
        host: process.env.DB_HOST, // Host database (biasanya localhost)
        port: process.env.DB_PORT, // Port database (5432 default PostgreSQL)
        dialect: "postgres", // Dialek database
        logging: false, // Matikan logging jika tidak diperlukan
    }
);

// Cek koneksi ke database
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Koneksi ke database berhasil!");
    } catch (error) {
        console.error("❌ Gagal menghubungkan database:", error);
    }
})();

export default sequelize;