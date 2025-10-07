// routes/bookingRoutes.js
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";  // ✅ only this one
import {
  customizeTrip,
  getUserBookings,
  cancelBooking,
  getAllBookingsAdmin,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// User routes
router.post("/customize", authMiddleware, customizeTrip);
router.get("/bookings", authMiddleware, getUserBookings);
router.put("/bookings/:id/cancel", authMiddleware, cancelBooking);

// Admin routes
router.get("/admin/bookings", authMiddleware, getAllBookingsAdmin);
router.put("/admin/bookings/:id/status", authMiddleware, updateBookingStatus);

export default router;
