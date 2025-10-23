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

// ✅ CORS setup (fully safe for Vercel + Localhost)
const allowedOrigins = [
  process.env.FRONTEND_URL?.trim(), // your live site from env
  "http://localhost:5173", // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow tools like Postman
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Root test route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "✅ Server is running successfully!",
    message: "🚀 Travel Agency Backend on Vercel",
    frontend_url: process.env.FRONTEND_URL,
    environment: process.env.NODE_ENV || "production",
    time: new Date().toISOString(),
  });
});

// ✅ Start server (works on both local + vercel)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
