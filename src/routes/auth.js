import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Login Admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  // Cari user di Supabase
  const { data: admins, error } = await supabase
    .from("admin")
    .select("*")
    .eq("username", username)
    .limit(1);

  if (error) return res.status(500).json({ error: error.message });
  if (admins.length === 0) return res.status(404).json({ error: "Admin tidak ditemukan" });

  const admin = admins[0];

  // Verifikasi password
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return res.status(401).json({ error: "Password salah" });

  // Buat JWT token
  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login berhasil", token });
});

export default router;
