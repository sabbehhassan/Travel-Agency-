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

// ✅ Allowed Origins
const allowedOrigins = [
  process.env.FRONTEND_URL?.trim(), // your live frontend URL (from .env)
  "http://localhost:5173", // local dev
];

// ✅ CORS Configuration (safe + flexible)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      // Match origin flexibly (handles trailing slashes or subpaths)
      const isAllowed = allowedOrigins.some((allowed) =>
        origin.startsWith(allowed)
      );

      if (isAllowed) {
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

// ✅ Server Listener (for local + Vercel)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ Allowed Origins:", allowedOrigins);
});
