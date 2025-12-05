// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error('Supabase URL and Anon Key are required');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config(); // ini harus dijalankan di sini

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Gagal memuat variabel lingkungan Supabase");
  console.error("SUPABASE_URL:", SUPABASE_URL);
  console.error("SUPABASE_ANON_KEY:", SUPABASE_KEY ? "[TERSEDIA]" : "undefined");
  process.exit(1);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
