import { supabase } from "../supabaseClient.js";

// Common server error handler
const serverErr = (res, err) => {
  console.error("❌ Server Error:", err);
  return res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
};

// -------------------
// Customize Trip (user creates trip)
// -------------------
export const customizeTrip = async (req, res) => {
  console.log("🔹 Customize Trip Body:", req.body);
  const { destination, days, nights, travelType, hotel, extras } = req.body;

  try {
    // ✅ Basic validation
    if (!destination || !days || !nights) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // ✅ Price Calculation
    let basePrice =
      hotel === "Luxury"
        ? 470000
        : hotel === "Deluxe"
        ? 340000
        : 250000;
    if (travelType === "By Air") basePrice += 50000;

    const extrasCost =
      extras && typeof extras === "object"
        ? Object.values(extras).filter(Boolean).length * 5000
        : 0;

    const totalPrice = basePrice + extrasCost;

    // ✅ Insert into Supabase
    const { data, error } = await supabase
      .from("Trips")
      .insert([
        {
          user_id: req.userId,
          destination,
          days: Number(days) || 0,
          nights: Number(nights) || 0,
          travel_type: travelType,
          hotel_category: hotel,
          extras,
          total_price: totalPrice,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.json({ success: true, trip: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

// -------------------
// Get All Bookings for logged-in user
// -------------------
export const getUserBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Keep consistent frontend response shape
    return res.json({ success: true, bookings: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

// -------------------
// Cancel booking (user)
// -------------------
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Trips")
      .update({ status: "Cancelled" })
      .eq("id", id)
      .eq("user_id", req.userId)
      .select()
      .single();

    if (error) throw error;

    return res.json({ success: true, booking: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

// -------------------
// Admin: Get all bookings (with user details)
// -------------------
export const getAllBookingsAdmin = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { data, error } = await supabase
      .from("Trips")
      .select(
        `id, destination, days, nights, travel_type, hotel_category, total_price, status, created_at, RegisterDetails(id, name, email)`
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json({ success: true, bookings: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

// -------------------
// Admin: Update booking status
// -------------------
export const updateBookingStatus = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("Trips")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return res.json({ success: true, booking: data });
  } catch (err) {
    return serverErr(res, err);
  }
};
