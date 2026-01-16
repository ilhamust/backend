// import authService from '../services/authService.js';

// class AuthController {
//     async register(req, res) {
//         try {
//             const { email, password } = req.body;
            
//             if (!email || !password) {
//                 return res.status(400).json({ 
//                     error: 'Email dan password harus diisi' 
//                 });
//             }

//             const data = await authService.register(email, password);
//             res.status(201).json(data);
//         } catch (error) {
//             res.status(500).json({ 
//                 error: error.message || 'Terjadi kesalahan saat registrasi' 
//             });
//         }
//     }

//     async login(req, res) {
//         try {
//             const { email, password } = req.body;
            
//             if (!email || !password) {
//                 return res.status(400).json({ 
//                     error: 'Email dan password harus diisi' 
//                 });
//             }

//             const data = await authService.login(email, password);
//             res.status(200).json(data);
//         } catch (error) {
//             res.status(401).json({ 
//                 error: error.message || 'Email atau password salah' 
//             });
//         }
//     }

//     async logout(req, res) {
//         try {
//             const result = await authService.logout();
//             res.status(200).json(result);
//         } catch (error) {
//             res.status(500).json({ 
//                 error: error.message || 'Terjadi kesalahan saat logout' 
//             });
//         }
//     }
// }

// export default new AuthController();
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
