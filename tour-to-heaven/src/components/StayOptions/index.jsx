import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import stayOptions from "../../data/stayoption";
import { useNavigate } from "react-router-dom";

const StayOptions = () => {
  const { user, token, isLoggedIn } = useAuth();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [form, setForm] = useState({
    rooms: 1,
    guests: 1,
    checkIn: "",
    checkOut: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // open booking modal (or redirect if not logged in)
  const handleOpenBooking = (stay) => {
    if (!isLoggedIn) {
      // redirect to login page
      navigate("/login", { replace: true });
      return;
    }
    // open modal if logged in
    setSelectedHotel(stay);
  };

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle booking submit
  const handleBooking = async () => {
    if (!form.checkIn || !form.checkOut) {
      setMessage("📅 Please select check-in and check-out dates.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          hotelName: selectedHotel.name,
          location: selectedHotel.location,
          ...form,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Booking failed.");

      setMessage("✅ Booking successful! We'll contact you soon.");
      setTimeout(() => {
        setSelectedHotel(null);
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Stay With Us in Northern Pakistan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stayOptions.map((stay) => (
            <div
              key={stay.id}
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={stay.image}
                alt={stay.name}
                className="w-full h-60 object-contain"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {stay.name}
                </h3>
                <p className="text-sm text-cyan-700 font-medium">
                  {stay.location}
                </p>
                <p className="text-gray-600 text-sm my-2">{stay.description}</p>

                <button
                  onClick={() => handleOpenBooking(stay)}
                  className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center text-cyan-700 mb-4">
              Book Your Stay
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {selectedHotel.name}, {selectedHotel.location}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  min="1"
                  value={form.rooms}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Guests</label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Check-In
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {message && (
                <p className="text-center text-sm text-cyan-700">{message}</p>
              )}

              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StayOptions;
