import authService from "../services/authService.js";

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username dan password wajib diisi",
        });
      }

      const result = await authService.login(username, password);

      res.status(200).json({
        message: "Login berhasil",
        token: result.token,
      });
    } catch (error) {
      res.status(401).json({
        message: error.message || "Login gagal",
      });
    }
  }
}

export default new AuthController();
