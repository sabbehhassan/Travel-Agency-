// backend/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Configure CORS (like video)
const corsOptions = {
  origin: process.env.FRONTEND_URL, // your frontend URL (no trailing slash)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Root route (for health check)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "✅ Server is running successfully!",
    message: "🚀 Travel Agency Backend on Vercel",
    frontend_url: process.env.FRONTEND_URL,
    environment: process.env.NODE_ENV || "production",
    time: new Date().toISOString(),
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ FRONTEND_URL:", process.env.FRONTEND_URL);
});
