import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prestasiRoutes from "./routes/prestasi.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-web-t636-dncpdman1-ilhamusts-projects.vercel.app",
    "https://roudlotushsholihin.ponpes.id"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (_, res) => res.json({ 
  status: "✅ Backend berjalan dengan baik!",
  timestamp: new Date().toISOString()
}));
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

app.get("/debug-env", (req, res) => {
  res.json({
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "OK" : "MISSING",
    JWT_SECRET: process.env.JWT_SECRET ? "OK" : "MISSING"
  });
});

app.use("/api", authRoutes);
app.use("/api/prestasi", prestasiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong!' 
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import prestasiRoutes from "./routes/prestasi.js";
// import authRoutes from "./routes/auth.js";

// dotenv.config();

// const app = express();

// /* ======================
//    CORS CONFIG (FIX)
// ====================== */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://frontend-web-t636-dncpdman1-ilhamusts-projects.vercel.app",
//   "https://roudlotushsholihin.ponpes.id"
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     // allow Postman / server-to-server
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS not allowed"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// }));

// /* ======================
//    MIDDLEWARE
// ====================== */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ======================
//    ROUTES
// ====================== */
// app.get("/", (_, res) => {
//   res.json({ status: "✅ Backend berjalan dengan baik!" });
// });

// app.use("/api", authRoutes);
// app.use("/api/prestasi", prestasiRoutes);

// /* ======================
//    SERVER
// ====================== */
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
// });
