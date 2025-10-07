// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    if (decoded.role) {
      req.userRole = decoded.role;
      return next();
    }

    const { data, error } = await supabase
      .from("RegisterDetails")
      .select("role")
      .eq("id", req.userId)
      .maybeSingle();

    if (error) {
      console.warn("Role fetch error:", error.message || error);
      return next();
    }

    req.userRole = data?.role;
    next();
  } catch (err) {
    console.warn("authMiddleware error:", err.message || err);
    res.status(401).json({ message: "Invalid token" });
  }
}
