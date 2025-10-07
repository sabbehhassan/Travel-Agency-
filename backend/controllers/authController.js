// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";
import { serverErr } from "../utils/errorHandler.js";

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { data: existingUser } = await supabase
      .from("RegisterDetails")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("RegisterDetails")
      .insert([{ name, email, password: hashedPassword, role: "user" }])
      .select("id, name, email, role, created_at")
      .single();

    if (error) throw error;

    const token = jwt.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: data, token });
  } catch (err) {
    return serverErr(res, err);
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from("RegisterDetails")
      .select("id, name, email, role, password, created_at")
      .eq("email", email)
      .single();

    if (error || !user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
      },
      token,
    });
  } catch (err) {
    return serverErr(res, err);
  }
};
