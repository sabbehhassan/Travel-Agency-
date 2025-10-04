// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Travel Agency Backend Running with Supabase...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// server.js ke last me
app.use((req, res) => {
  console.error(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});
