// backend/routes/users.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { supabase } from "../supabaseClient.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // avatar upload in memory

// -------------------
// Helper: send server error
// -------------------
const serverErr = (res, err) => {
  console.error(err);
  return res.status(500).json({ success: false, message: err.message || "Server error" });
};

// 🔹 Middleware: Verify JWT and attach userId + role (fetch role if not in token)
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // If role present on token use it, otherwise fetch from DB
    if (decoded.role) {
      req.userRole = decoded.role;
      return next();
    }

    // fallback: fetch user role from DB
    const { data: uData, error: uErr } = await supabase
      .from("RegisterDetails")
      .select("role")
      .eq("id", req.userId)
      .maybeSingle();

    if (uErr) {
      console.warn("Could not fetch role from DB:", uErr.message || uErr);
      // still allow but set role undefined
      req.userRole = undefined;
      return next();
    }

    req.userRole = uData?.role;
    return next();
  } catch (err) {
    console.warn("authMiddleware error:", err.message || err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// -------------------
// Register
// -------------------
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { data: existingUser } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("RegisterDetails")
      .insert([{ name, email, password: hashedPassword, role: "user" }])
      .select("id, name, email, phone, cnic, avatar, role, created_at")
      .single();

    if (error) throw error;

    const token = jwt.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: data, token });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Login
// -------------------
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
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnic: user.cnic,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.created_at,
      },
      token,
    });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Get Current User (/me) - include role
// -------------------
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email, phone, cnic, avatar, role, created_at")
      .eq("id", req.userId)
      .single();

    if (error || !data) return res.status(404).json({ message: "User not found" });

    res.json(data);
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Profile Update (avatar upload supported)
// -------------------
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
      .select("id, name, email, phone, cnic, avatar, role, created_at")
      .single();

    if (error) throw error;

    res.json({ message: "✅ Profile updated successfully", user: updatedUser });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Change Password
// -------------------
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
    return serverErr(res, err);
  }
});

// -------------------
// Customize Trip (user creates trip)
// -------------------
router.post("/customize", authMiddleware, async (req, res) => {
  console.log("🔹 Customize Trip Body:", req.body);
  const { destination, days, nights, travelType, hotel, extras } = req.body;

  try {
    // price calc (replace with real logic)
    let basePrice = hotel === "Luxury" ? 470000 : hotel === "Deluxe" ? 340000 : 250000;
    if (travelType === "By Air") basePrice += 50000;
    const extrasCost = (extras && typeof extras === "object") ? Object.values(extras).filter(Boolean).length * 5000 : 0;
    const totalPrice = basePrice + extrasCost;

    const { data, error } = await supabase
      .from("Trips")
      .insert([
        {
          user_id: req.userId,
          destination,
          days: Number(days) || 0,
          nights: Number(nights) || 0,
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
    return res.json({ success: true, trip: data });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Get All Bookings for logged-in user
// -------------------
router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // keep response shape stable for frontend: data.bookings
    return res.json({ success: true, bookings: data });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Cancel booking (user)
router.put("/bookings/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Trips")
      .update({ status: "Cancelled" })
      .eq("id", id)
      .eq("user_id", req.userId)
      .select()
      .single();

    if (error) throw error;
    return res.json({ success: true, booking: data });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Admin: Get all bookings (includes RegisterDetails nested)
// -------------------
router.get("/admin/bookings", authMiddleware, async (req, res) => {
  try {
    // enforce admin role (if role not present on token we fetched above)
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { data, error } = await supabase
      .from("Trips")
      .select(
        `id, destination, days, nights, travel_type, hotel_category, total_price, status, created_at, RegisterDetails(id, name, email)`
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json({ success: true, bookings: data });
  } catch (err) {
    return serverErr(res, err);
  }
});

// -------------------
// Admin: update booking status
// -------------------
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

    return res.json({ success: true, booking: data });
  } catch (err) {
    return serverErr(res, err);
  }
});

export default router;
