import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

console.log("✅ AUTH ROUTES LOADED");

router.post("/login", authController.login);

export default router;
