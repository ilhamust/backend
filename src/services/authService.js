import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class AuthService {
  async login(username, password) {
    const { data: admins, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", username)
      .limit(1);

    if (error) throw new Error(error.message);
    if (!admins || admins.length === 0) {
      throw new Error("Admin tidak ditemukan");
    }

    const admin = admins[0];

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new Error("Password salah");
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  }
}

export default new AuthService();
