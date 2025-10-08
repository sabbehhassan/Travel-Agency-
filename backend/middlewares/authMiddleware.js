// ✅ Ensure this file starts clean — only one import per module
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id || decoded._id;

    // Use role from token if available
    if (decoded.role) {
      req.userRole = decoded.role;
      return next();
    }

    // Fetch role from Supabase if missing
    const { data, error } = await supabase
      .from("RegisterDetails")
      .select("role")
      .eq("id", req.userId)
      .maybeSingle();

    if (error) {
      console.error("Role fetch error:", error.message);
      return res.status(500).json({ message: "Error fetching user role" });
    }

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userRole = data.role;
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    console.error("authMiddleware error:", err.message);
    res.status(401).json({ message });
  }
}
