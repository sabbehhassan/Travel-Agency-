// backend/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ Dynamic CORS setup
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

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Root Route (for testing deployment)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "✅ Server is running successfully!",
    message: "🚀 Travel Agency Backend on Vercel",
    environment: process.env.NODE_ENV || "production",
    time: new Date().toISOString(),
  });
});

// ✅ Export for Vercel Serverless
export default serverless(app);
