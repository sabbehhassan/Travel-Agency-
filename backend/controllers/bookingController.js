import { supabase } from "../supabaseClient.js";

const serverErr = (res, err) => {
  console.error("❌ Server Error:", err);
  return res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
};

// -------------------
// ✈️ User Trip Controllers
// -------------------

export const customizeTrip = async (req, res) => {
  const { destination, days, nights, travelType, hotel, extras } = req.body;
  try {
    if (!destination || !days || !nights)
      return res.status(400).json({ message: "Please fill all required fields." });

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
          days: Number(days),
          nights: Number(nights),
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
    res.json({ success: true, trip: data });
  } catch (err) {
    serverErr(res, err);
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, bookings: data });
  } catch (err) {
    serverErr(res, err);
  }
};

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
    res.json({ success: true, booking: data });
  } catch (err) {
    serverErr(res, err);
  }
};

// -------------------
// 🏨 Hotel Booking (User)
// -------------------

export const createHotelBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { hotelName, location, rooms, guests, checkIn, checkOut, roomType } =
      req.body;

    if (!hotelName || !checkIn || !checkOut)
      return res.status(400).json({ message: "Missing required fields" });

    const { data, error } = await supabase
      .from("hotelbookings")
      .insert([
        {
          user_id: userId,
          hotel_name: hotelName,
          location,
          rooms: Number(rooms) || 1,
          guests: Number(guests) || 1,
          check_in: checkIn,
          check_out: checkOut,
          room_type: roomType || "Standard",
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, booking: data });
  } catch (err) {
    serverErr(res, err);
  }
};

export const getUserHotelBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("hotelbookings")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, bookings: data });
  } catch (err) {
    serverErr(res, err);
  }
};

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
    res.json({ success: true, booking: data });
  } catch (err) {
    serverErr(res, err);
  }
};

// -------------------
// 🛠️ ADMIN CONTROLLERS
// -------------------

export const getAllBookingsAdmin = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Trips")
      .select("*, RegisterDetails(id, name, email)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, bookings: data });
  } catch (err) {
    serverErr(res, err);
  }
};

// ✅ Get all Hotel Bookings (Admin)
export const getAllHotelBookingsAdmin = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("hotelbookings")
      .select("*, RegisterDetails(id, name, email)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, bookings: data });
  } catch (err) {
    serverErr(res, err);
  }
};

// ✅ Update Trip Booking Status
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
    res.json({ success: true, booking: data });
  } catch (err) {
    serverErr(res, err);
  }
};

// ✅ Update Hotel Booking Status (Admin)
export const updateHotelBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("hotelbookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, booking: data });
  } catch (err) {
    serverErr(res, err);
  }
};
