// routes/userRoutes.js
import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import {
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";  // ✅ only default import

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/update", authMiddleware, upload.single("avatar"), updateProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;
