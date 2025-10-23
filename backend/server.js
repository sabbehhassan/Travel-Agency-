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

// ✅ CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Root route (testing)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "✅ Server is running successfully!",
    message: "🚀 Travel Agency Backend on Vercel",
    environment: process.env.NODE_ENV || "production",
    time: new Date().toISOString(),
  });
});

// ✅ Start server (for local + Vercel auto export)
const PORT = process.env.PORT || 5000;

// Only listen locally, Vercel will handle in production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ✅ Export app for Vercel
export default app;
