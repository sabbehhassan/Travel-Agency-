import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaSuitcase,
  FaCog,
  FaBars,
  FaTimes,
  FaHotel,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../Profile";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout, user, token } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Fetch Trip Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (activeTab !== "bookings") return;
      try {
        if (!token) return navigate("/login");
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/bookings/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("❌ Trip fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token, activeTab, navigate]);

  // ✅ Fetch Hotel Bookings
  useEffect(() => {
    const fetchHotelBookings = async () => {
      if (activeTab !== "bookings") return;
      try {
        const res = await fetch("http://localhost:5000/api/bookings/hotel/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch hotel bookings");
        setHotelBookings(data.bookings || []);
      } catch (err) {
        console.error("❌ Hotel fetch error:", err.message);
      }
    };
    fetchHotelBookings();
  }, [token, activeTab]);

  // ✅ Cancel Booking
  const handleCancel = async (id, type = "trip") => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const endpoint =
        type === "trip"
          ? `http://localhost:5000/api/users/bookings/${id}/cancel`
          : `http://localhost:5000/api/bookings/hotel/${id}/cancel`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to cancel booking");

      if (type === "trip") {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
        );
      } else {
        setHotelBookings((prev) =>
          prev.map((h) => (h.id === id ? { ...h, status: "Cancelled" } : h))
        );
      }
    } catch (err) {
      console.error("❌ Cancel error:", err.message);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-cyan-600">Dashboard</span>
          <button
            className="md:hidden text-gray-600 hover:text-cyan-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-4 px-4 py-6">
          {[
            { id: "bookings", icon: <FaSuitcase />, label: "My Bookings" },
            { id: "profile", icon: <FaUser />, label: "Profile" },
            { id: "settings", icon: <FaCog />, label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 w-full text-left transition-colors ${
                activeTab === tab.id
                  ? "text-cyan-600 font-semibold"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 w-full overflow-x-hidden">
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden text-gray-600 hover:text-cyan-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={22} />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center md:text-left w-full">
            Welcome Back,{" "}
            <span className="text-cyan-600">{user?.name || "Loading..."}</span>!
          </h1>
        </div>

        {activeTab === "bookings" && (
          <div className="bg-white p-4 rounded-lg shadow space-y-8">
            {/* Customized Trips */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-cyan-700">
                ✈️ Customized Trips
              </h2>

              {loading ? (
                <p>Loading...</p>
              ) : bookings.length === 0 ? (
                <p className="text-gray-500">No customized trips found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="border rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
                    >
                      <h3 className="font-bold text-cyan-700 text-lg mb-1">
                        {b.destination}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Duration: {b.days}D / {b.nights}N
                      </p>
                      <p className="text-sm text-gray-600">
                        Hotel: {b.hotel_category}
                      </p>
                      <p className="text-sm text-gray-600">
                        Travel: {b.travel_type}
                      </p>
                      <p
                        className={`font-semibold mt-1 ${
                          b.status === "Confirmed"
                            ? "text-cyan-600"
                            : b.status === "Cancelled"
                            ? "text-red-500"
                            : "text-gray-700"
                        }`}
                      >
                        Status: {b.status}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        Rs. {b.total_price?.toLocaleString()}
                      </p>
                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(b.id, "trip")}
                          className="mt-3 text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto mt-4">
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2 border">Destination</th>
                      <th className="p-2 border">Duration</th>
                      <th className="p-2 border">Hotel</th>
                      <th className="p-2 border">Travel</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{b.destination}</td>
                        <td className="p-2 border">
                          {b.days}D / {b.nights}N
                        </td>
                        <td className="p-2 border">{b.hotel_category}</td>
                        <td className="p-2 border">{b.travel_type}</td>
                        <td
                          className={`p-2 border font-semibold ${
                            b.status === "Confirmed"
                              ? "text-cyan-600"
                              : b.status === "Cancelled"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {b.status}
                        </td>
                        <td className="p-2 border">
                          Rs. {b.total_price?.toLocaleString()}
                        </td>
                        <td className="p-2 border text-center">
                          {b.status === "Pending" && (
                            <button
                              onClick={() => handleCancel(b.id, "trip")}
                              className="text-red-600 hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Hotel Bookings */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-cyan-700">
                🏨 Hotel Bookings
              </h2>

              {hotelBookings.length === 0 ? (
                <p className="text-gray-500">No hotel bookings found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                  {hotelBookings.map((h) => (
                    <div
                      key={h.id}
                      className="border rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
                    >
                      <h3 className="font-bold text-cyan-700 text-lg mb-1 flex items-center gap-2">
                        <FaHotel /> {h.hotel_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Location: {h.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Room Type: {h.room_type}
                      </p>
                      <p className="text-sm text-gray-600">
                        Guests: {h.guests}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaCalendarAlt /> {h.check_in} → {h.check_out}
                      </p>
                      <p
                        className={`font-semibold mt-1 ${
                          h.status === "Confirmed"
                            ? "text-cyan-600"
                            : h.status === "Cancelled"
                            ? "text-red-500"
                            : "text-gray-700"
                        }`}
                      >
                        Status: {h.status}
                      </p>
                      {h.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(h.id, "hotel")}
                          className="mt-3 text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto mt-4">
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2 border">Hotel</th>
                      <th className="p-2 border">Location</th>
                      <th className="p-2 border">Room</th>
                      <th className="p-2 border">Guests</th>
                      <th className="p-2 border">Check-In</th>
                      <th className="p-2 border">Check-Out</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelBookings.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{h.hotel_name}</td>
                        <td className="p-2 border">{h.location}</td>
                        <td className="p-2 border">{h.room_type}</td>
                        <td className="p-2 border">{h.guests}</td>
                        <td className="p-2 border">{h.check_in}</td>
                        <td className="p-2 border">{h.check_out}</td>
                        <td
                          className={`p-2 border font-semibold ${
                            h.status === "Confirmed"
                              ? "text-cyan-600"
                              : h.status === "Cancelled"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {h.status}
                        </td>
                        <td className="p-2 border text-center">
                          {h.status === "Pending" && (
                            <button
                              onClick={() => handleCancel(h.id, "hotel")}
                              className="text-red-600 hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Profile & Settings */}
        {activeTab === "profile" && <ProfilePage embedded />}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">Settings options will appear here...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
