import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ✅ Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { data: existingUser } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .single();

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

// ✅ Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Middleware to verify token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Auth error:", err.message); // Debug log
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ✅ Get logged-in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email")
      .eq("id", req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✅ Get user bookings
router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    console.log("User ID from token:", req.userId); // Debugging

    if (!req.userId) {
      return res.status(400).json({ message: "User ID missing from token" });
    }

    // For now, return dummy bookings
    const bookings = [
      {
        id: 1,
        userId: req.userId,
        destination: "Hunza Valley",
        date: "2025-10-05",
        status: "Confirmed",
      },
      {
        id: 2,
        userId: req.userId,
        destination: "Skardu",
        date: "2025-10-12",
        status: "Pending",
      },
    ];

    res.json(bookings);
  } catch (err) {
    console.error("Bookings error:", err.message); // ✅ Debug log
    res.status(500).json({ message: err.message });
  }
});

export default router;
