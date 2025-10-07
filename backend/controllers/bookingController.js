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
    if (!destination || !days || !nights) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    let basePrice =
      hotel === "Luxury" ? 470000 : hotel === "Deluxe" ? 340000 : 250000;
    if (travelType === "By Air") basePrice += 50000;

    const extrasCost =
      extras && typeof extras === "object"
        ? Object.values(extras).filter(Boolean).length * 5000
        : 0;

    const totalPrice = basePrice + extrasCost;

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
// Get All Trip Bookings for logged-in user
// -------------------
export const getUserBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.json({ success: true, bookings: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

// -------------------
// Cancel Trip Booking
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
// ✅ HOTEL BOOKING CONTROLLERS
// -------------------

// Create hotel booking
export const createHotelBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { hotelName, location, rooms, guests, checkIn, checkOut, roomType } =
      req.body;

    if (!userId)
      return res.status(401).json({ message: "Unauthorized: user not found" });
    if (!hotelName || !checkIn || !checkOut)
      return res.status(400).json({ message: "Missing required fields" });

    const bookingData = {
      user_id: userId,
      hotel_name: hotelName,
      location: location || null,
      rooms: Number(rooms) || 1,
      guests: Number(guests) || 1,
      check_in: checkIn,
      check_out: checkOut,
      room_type: roomType || "Standard",
      status: "Pending",
    };

    const { data, error } = await supabase
      .from("hotelbookings")
      .insert([bookingData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Hotel booking created successfully",
      booking: data,
    });
  } catch (err) {
    console.error("💥 createHotelBooking exception:", err.message || err);
    res.status(500).json({ message: "Failed to create hotel booking" });
  }
};

// Get user's hotel bookings
export const getUserHotelBookings = async (req, res) => {
  try {
    const userId = req.userId;
    const { data, error } = await supabase
      .from("hotelbookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, bookings: data });
  } catch (err) {
    console.error("Hotel bookings fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch hotel bookings" });
  }
};

// Cancel hotel booking
export const cancelHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("hotelbookings")
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
// 🛠️ ADMIN CONTROLLERS
// -------------------

// Get all bookings (Trips + User details)
export const getAllBookingsAdmin = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*, RegisterDetails(id, name, email)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.json({ success: true, bookings: data });
  } catch (err) {
    return serverErr(res, err);
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
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
