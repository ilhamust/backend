import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prestasiRoutes from "./routes/prestasi.js";
import authRoutes from "./routes/auth.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.get("/", (_, res) => res.send("✅ Backend berjalan dengan baik!"));
app.use("/api/prestasi", prestasiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`));
