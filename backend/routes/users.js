// backend/routes/users.js
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
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role; // ✅ role add
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
      .insert([{ name, email, password: hashedPassword, role: "user" }]) // 👈 default role user
      .select("id, name, email, phone, cnic, avatar, role, created_at")
      .single();

    if (error) throw error;

    const token = jwt.sign(
      { id: data.id, role: data.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
    const { data: user, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email, phone, cnic, avatar, role, password, created_at")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, // ✅ role added
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnic: user.cnic,
        avatar: user.avatar,
        role: user.role, // ✅ include role
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
      .select("id, name, email, phone, cnic, avatar, role, created_at") // ✅ include role
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
router.put("/update", authMiddleware, upload.single("avatar"), async (req, res) => {
  const { name, email, phone, cnic } = req.body;
  let avatarUrl = null;

  try {
    if (req.file) {
      const fileName = `avatars/${req.userId}_${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      avatarUrl = publicUrlData.publicUrl;
    }

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
      .select("id, name, email, phone, cnic, avatar, role, created_at") // ✅ include role
      .single();

    if (error) throw error;

    res.json({ message: "✅ Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

//
// ✅ Change Password
//
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
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await supabase.from("RegisterDetails").update({ password: hashedPassword }).eq("id", req.userId);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
// ✅ Customize Trip API
//
router.post("/customize", authMiddleware, async (req, res) => {
  console.log("🔹 Customize Trip Body:", req.body);
  const { destination, days, nights, travelType, hotel, extras } = req.body;

  try {
    let basePrice = hotel === "Luxury" ? 470000 : hotel === "Deluxe" ? 340000 : 250000;
    if (travelType === "By Air") basePrice += 50000;

    const extrasCost = Object.values(extras).filter(Boolean).length * 5000;
    const totalPrice = basePrice + extrasCost;

    const { data, error } = await supabase
      .from("Trips")
      .insert([
        {
          user_id: req.userId,
          destination,
          days,
          nights,
          travel_type: travelType,
          hotel_category: hotel,
          extras,
          total_price: totalPrice,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, trip: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//
// ✅ Get All Bookings of Logged-in User
//
router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, bookings: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//
// ✅ Cancel Booking (User)
router.put("/bookings/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Trips")
      .update({ status: "Cancelled" })
      .eq("id", id)
      .eq("user_id", req.userId) // user apni booking hi cancel kar sake
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, booking: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//
// ✅ Get All Bookings (Admin only)
router.get("/admin/bookings", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { data, error } = await supabase
      .from("Trips")
      .select(`
        id, destination, days, nights, travel_type, hotel_category,
        total_price, status, created_at,
        RegisterDetails(id, name, email)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, bookings: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//
// ✅ Update Booking Status (Admin only)
router.put("/admin/bookings/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("Trips")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, booking: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
