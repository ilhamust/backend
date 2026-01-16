# Struktur Project Backend Web Sekolah

## 📁 Struktur Direktori

```
backend/
├── .env                          # Environment variables (tidak di-commit)
├── .gitignore                    # File yang diabaikan Git
├── package.json                  # Dependencies dan scripts npm
├── package-lock.json             # Lock file untuk dependencies
│
├── src/                          # Source code utama
│   ├── app.js                    # Entry point aplikasi
│   │
│   ├── config/                   # Konfigurasi aplikasi
│   │   └── supabaseClient.js     # Konfigurasi koneksi Supabase
│   │
│   ├── controllers/              # Controller layer (business logic)
│   │   └── authController.js     # Controller untuk autentikasi
│   │
│   ├── routes/                   # Definisi route/endpoint API
│   │   ├── auth.js               # Route untuk autentikasi
│   │   └── prestasi.js           # Route untuk prestasi
│   │
│   ├── services/                 # Service layer (data access)
│   │   └── authService.js        # Service untuk autentikasi
│   │
│   └── db/                       # Database related files
│
└── uploads/                      # Direktori untuk file upload
```

## 📦 Dependencies

### Production Dependencies
- **@supabase/supabase-js** (^2.80.0) - Client library untuk Supabase
- **bcrypt** (^6.0.0) - Enkripsi password
- **cors** (^2.8.5) - Cross-Origin Resource Sharing
- **dotenv** (^16.6.1) - Manajemen environment variables
- **express** (^4.21.2) - Web framework Node.js
- **jsonwebtoken** (^9.0.2) - JWT untuk autentikasi
- **mongoose** (^7.5.0) - MongoDB ODM
- **multer** (^2.0.2) - Middleware untuk file upload

### Development Dependencies
- **nodemon** (^3.0.1) - Auto-restart server saat development

## 🚀 Scripts

```bash
npm start      # Menjalankan aplikasi (production)
npm run dev    # Menjalankan aplikasi dengan nodemon (development)
npm test       # Menjalankan test (belum dikonfigurasi)
```

## 📝 Informasi Project

- **Nama**: web-sekolah-backend
- **Versi**: 1.0.0
- **Deskripsi**: Backend for web-sekolah application
- **Entry Point**: src/app.js
- **Type**: ES Module

## 🏗️ Arsitektur

Project ini menggunakan arsitektur **MVC (Model-View-Controller)** dengan pemisahan concern sebagai berikut:

1. **Routes** - Mendefinisikan endpoint API
2. **Controllers** - Menghandle request dan response
3. **Services** - Logika bisnis dan akses data
4. **Config** - Konfigurasi external services (Supabase, database, etc.)

## 🔐 Fitur

Berdasarkan struktur file, aplikasi ini memiliki fitur:
- ✅ Autentikasi (login, register, JWT)
- ✅ Manajemen Prestasi
- ✅ File Upload
- ✅ Integrasi Supabase

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose) + Supabase
- **Authentication**: JWT + bcrypt
- **File Storage**: Multer
