import express from "express";
import {
  customizeTrip,
  getUserBookings,
  cancelBooking,
  getAllBookingsAdmin,
  getAllHotelBookingsAdmin, // ✅ Added
  updateBookingStatus,
  updateHotelBookingStatus, // ✅ Added
  createHotelBooking,
  getUserHotelBookings,
  cancelHotelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🏨 Hotel Booking Routes (User)
router.post("/hotel", authMiddleware, createHotelBooking);
router.get("/hotel/user", authMiddleware, getUserHotelBookings);
router.put("/hotel/:id/cancel", authMiddleware, cancelHotelBooking);

// ✈️ Trip Routes (User)
router.post("/customize", authMiddleware, customizeTrip);
router.get("/bookings", authMiddleware, getUserBookings);
router.put("/bookings/:id/cancel", authMiddleware, cancelBooking);

// 🛠️ Admin Routes (For Admin Panel)
router.get("/admin/bookings", authMiddleware, getAllBookingsAdmin);
router.put("/admin/bookings/:id/status", authMiddleware, updateBookingStatus);

// ✅ Added Admin Hotel Routes
router.get("/admin/hotelbookings", authMiddleware, getAllHotelBookingsAdmin);
router.put(
  "/admin/hotelbookings/:id/status",
  authMiddleware,
  updateHotelBookingStatus
);

export default router;
