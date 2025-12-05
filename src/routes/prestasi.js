import express from "express";
import multer from "multer";
import { supabase } from "../config/supabaseClient.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });


// ==========================
// GET ALL PRESTASI
// ==========================
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("prestasi")
      .select("*")
      .order("tanggal", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("❌ Error fetch:", err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});


// ==========================
// UPLOAD PRESTASI
// ==========================
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { judul, kategori, tanggal, deskripsi, tingkat } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const formattedDate = new Date(tanggal).toISOString().split("T")[0];

    const fileName = `prestasi/${Date.now()}-${req.file.originalname}`;
    const fileBuffer = fs.readFileSync(req.file.path);

    const { error: uploadError } = await supabase.storage
      .from("prestasi")
      .upload(fileName, fileBuffer, {
        contentType: req.file.mimetype,
      });

    fs.unlinkSync(req.file.path);

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("prestasi")
      .getPublicUrl(fileName);

    const { data: inserted, error: insertError } = await supabase
      .from("prestasi")
      .insert([
        {
          judul,
          kategori,
          tanggal: formattedDate,
          deskripsi,
          tingkat,          // <-- tambahkan ini
          gambar: publicData.publicUrl,
        },
      ])
      .select();

    if (insertError) throw insertError;

    res.json({
      success: true,
      message: "Prestasi berhasil ditambahkan",
      data: inserted[0],
    });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ error: "Upload gagal" });
  }
});



// ==========================
// DELETE PRESTASI
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Ambil data untuk mendapatkan URL gambar
    const { data: prestasiData } = await supabase
      .from("prestasi")
      .select("*")
      .eq("id", id)
      .single();

    if (!prestasiData) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    // Hapus dari database
    const { error: deleteError } = await supabase
      .from("prestasi")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    // Hapus file dari storage
    const filePath = prestasiData.gambar.split("/storage/v1/object/public/")[1];

    await supabase.storage.from("prestasi").remove([filePath]);

    res.json({ success: true, message: "Berhasil dihapus" });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
});


export default router;
