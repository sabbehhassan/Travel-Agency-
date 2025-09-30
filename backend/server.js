import dotenv from "dotenv";
dotenv.config(); // ✅ must be at the top

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import userRoutes from "./routes/users.js"; // ✅ make sure the path & extension are correct

const app = express();

app.use(cors());
app.use(express.json());

// Supabase connection
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

if (supabase) {
  console.log("✅ Supabase Connected Successfully!");
} else {
  console.error("❌ Supabase Connection Failed!");
}

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Travel Agency Backend Running with Supabase...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
