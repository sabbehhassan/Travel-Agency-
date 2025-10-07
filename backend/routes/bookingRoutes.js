import express from "express";
import {
  customizeTrip,
  getUserBookings,
  cancelBooking,
  getAllBookingsAdmin,
  updateBookingStatus,
  createHotelBooking,
  getUserHotelBookings,
  cancelHotelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🏨 Hotel Booking Routes
router.post("/hotel", authMiddleware, createHotelBooking);
router.get("/hotel/user", authMiddleware, getUserHotelBookings);
router.put("/hotel/:id/cancel", authMiddleware, cancelHotelBooking);

// ✈️ Trip Routes
router.post("/customize", authMiddleware, customizeTrip);
router.get("/bookings", authMiddleware, getUserBookings);
router.put("/bookings/:id/cancel", authMiddleware, cancelBooking);

// 🛠️ Admin Routes
router.get("/admin/bookings", authMiddleware, getAllBookingsAdmin);
router.put("/admin/bookings/:id/status", authMiddleware, updateBookingStatus);

export default router;
