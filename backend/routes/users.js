import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { supabase } from "../supabaseClient.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // for avatar

// 🔹 Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { data: existingUser } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("RegisterDetails")
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ user: data, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Current User
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email, phone, cnic, avatar")
      .eq("id", req.userId)
      .single();

    if (error || !data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Profile Update API
router.put("/update", authMiddleware, upload.single("avatar"), async (req, res) => {
  const { name, email, phone, cnic } = req.body;
  let avatarUrl = null;

  try {
    // 🔹 Check for duplicate email (except current user)
    if (email) {
      const { data: existingEmail, error: emailError } = await supabase
        .from("RegisterDetails")
        .select("id")
        .eq("email", email)
        .neq("id", req.userId) // ignore current user
        .maybeSingle();

      if (emailError) throw emailError;
      if (existingEmail) {
        return res.status(400).json({ message: "❌ Email already in use" });
      }
    }

    // 🔹 Handle avatar upload if file provided
    if (req.file) {
      const fileName = `avatars/${req.userId}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, req.file.buffer, { contentType: "image/jpeg" });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      avatarUrl = data.publicUrl;
    }

    // 🔹 Update user profile
    const { data: updatedUser, error } = await supabase
      .from("RegisterDetails")
      .update({
        name,
        email,
        phone,
        cnic,
        ...(avatarUrl && { avatar: avatarUrl }), // only update if uploaded
      })
      .eq("id", req.userId)
      .select()
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
});

// ✅ Change Password
router.put("/change-password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const { data: user } = await supabase
      .from("RegisterDetails")
      .select("password")
      .eq("id", req.userId)
      .single();

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await supabase.from("RegisterDetails").update({ password: hashedPassword }).eq("id", req.userId);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
