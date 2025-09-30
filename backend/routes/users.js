import dotenv from "dotenv";
dotenv.config(); // ✅ very important if using env variables here

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
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("RegisterDetails") // ✅ Corrected table name
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .from("RegisterDetails") // ✅ Corrected table name
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) throw error;

    // Create JWT Token
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ user: data, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
