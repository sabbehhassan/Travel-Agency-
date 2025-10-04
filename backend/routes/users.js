import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { supabase } from "../supabaseClient.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // avatar upload in memory

// 🔹 Middleware: Verify JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET
    );
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//
// ✅ Register
//
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check existing user
    const { data: existingUser } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const { data, error } = await supabase
      .from("RegisterDetails")
      .insert([{ name, email, password: hashedPassword }])
      .select("id, name, email, phone, cnic, avatar, created_at")
      .single();

    if (error) throw error;

    // generate token
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: data, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
// ✅ Login
//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // get user
    const { data: user, error } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ return full user object (no password)
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnic: user.cnic,
        avatar: user.avatar,
        createdAt: user.created_at,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
// ✅ Get Current User
//
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email, phone, cnic, avatar, created_at")
      .eq("id", req.userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
// ✅ Profile Update API (with Avatar Upload)
router.put(
  "/update",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    const { name, email, phone, cnic } = req.body;
    let avatarUrl = null;

    try {
      // 🔹 Handle avatar upload
      if (req.file) {
        const fileName = `avatars/${req.userId}_${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("avatars") // ✅ bucket name must exist in Supabase
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // ✅ Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        avatarUrl = publicUrlData.publicUrl;
      }

      // 🔹 Update user profile in table
      const { data: updatedUser, error } = await supabase
        .from("RegisterDetails")
        .update({
          name,
          email,
          phone,
          cnic,
          ...(avatarUrl && { avatar: avatarUrl }),
        })
        .eq("id", req.userId)
        .select("id, name, email, phone, cnic, avatar, created_at")
        .single();

      if (error) throw error;

      res.json({
        message: "✅ Profile updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Profile update error:", err.message);
      res.status(500).json({ message: err.message });
    }
  }
);

//
// ✅ Change Password
//
router.put("/change-password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // fetch user password
    const { data: user } = await supabase
      .from("RegisterDetails")
      .select("password")
      .eq("id", req.userId)
      .single();

    if (!user) return res.status(404).json({ message: "User not found" });

    // check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update
    await supabase
      .from("RegisterDetails")
      .update({ password: hashedPassword })
      .eq("id", req.userId);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
