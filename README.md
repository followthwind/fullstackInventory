# fullstackInventory
![image](https://github.com/user-attachments/assets/1b95483d-ada6-41b7-9f9c-246943a58f71)


# Inventory Management System

Sebuah aplikasi manajemen inventaris berbasis web yang memungkinkan admin untuk menambah, mengedit, dan menghapus barang di dalam sistem. Aplikasi ini memiliki fitur pencarian berdasarkan nama dan ID barang.

## 📌 Fitur Utama
- **Autentikasi pengguna** (login & token JWT)
- **Role-based access control** (hanya admin yang dapat menambah, mengedit, dan menghapus barang)
- **Menampilkan daftar inventaris**
- **Pencarian barang berdasarkan nama & ID** secara real-time
- **Menambah, mengedit, dan menghapus barang** (khusus admin)

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL (menggunakan Sequelize ORM)
- **Autentikasi**: JWT (JSON Web Token)

## 🚀 Instalasi dan Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/followthwind/fullstackInventory.git
cd repository-name
```

### 2. Setup Backend
1. Pindah ke folder backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file `.env` dan tambahkan konfigurasi berikut:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=inventory_db
   JWT_SECRET=your_secret_key
   ```
4. Jalankan server backend:
   ```bash
   npm start
   ```

### 3. Setup Frontend
1. Pindah ke folder frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan aplikasi React:
   ```bash
   npm start
   ```

Aplikasi akan berjalan di `http://localhost:3000/` dan backend di `http://localhost:5000/`

## 📚 API Endpoint
### **Authentication**
- `POST /login` - Login pengguna dan mendapatkan token JWT

### **Inventory**
- `GET /inventory` - Mendapatkan daftar barang (hanya untuk pengguna yang telah login)
- `POST /inventory` - Menambah barang (hanya admin)
- `PUT /inventory/:id` - Mengedit barang (hanya admin)
- `DELETE /inventory/:id` - Menghapus barang (hanya admin)

## 🔒 Role & Akses
| Role  | Akses |
|--------|-------|
| **Admin** | Tambah, Edit, Hapus, Lihat |
| **Staff** | Hanya Lihat |

## ✨ Kontributor
- [ozang](https://github.com/followthwind)


