import React, { useState, useEffect, useCallback } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaSuitcase,
  FaCog,
  FaBars,
  FaTimes,
  FaHotel,
} from "react-icons/fa";
import { useAuth } from "../../context/authCon";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, token, user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tourBookings");
  const [tourBookings, setTourBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Fetch Tour Bookings
  const fetchTourBookings = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tour bookings");

      setTourBookings(data.bookings || []);
    } catch (err) {
      console.error("❌ Tour Fetch Error:", err.message);
      setError(err.message);
    }
  }, [token]);

  // ✅ Fetch Hotel Bookings
  const fetchHotelBookings = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/admin/hotelbookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch hotel bookings");

      setHotelBookings(data.bookings || []);
    } catch (err) {
      console.error("❌ Hotel Fetch Error:", err.message);
      setError(err.message);
    }
  }, [token]);

  // ✅ Load data when admin or tab changes
  useEffect(() => {
    const loadData = async () => {
      if (!token || user?.role !== "admin") return;
      setLoading(true);
      setError("");
      if (activeTab === "tourBookings") await fetchTourBookings();
      if (activeTab === "hotelBookings") await fetchHotelBookings();
      setLoading(false);
    };
    loadData();
  }, [activeTab, token, user, fetchTourBookings, fetchHotelBookings]);

  // ✅ Update booking status (for both tour & hotel)
  const updateStatus = async (type, id, status) => {
    try {
      const endpoint =
        type === "hotel"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/bookings/admin/hotelbookings/${id}/status`
          : `${import.meta.env.VITE_BACKEND_URL}/api/bookings/admin/bookings/${id}/status`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      if (type === "hotel") {
        setHotelBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: data.booking.status } : b))
        );
      } else {
        setTourBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: data.booking.status } : b))
        );
      }
    } catch (err) {
      console.error(err.message);
      alert("❌ Failed to update booking");
    }
  };

  // ✅ Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // ✅ Reusable Table Component
  const renderTable = (data, type) => (
    <>
      {/* 🖥 Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">User</th>
              {type === "hotel" ? (
                <>
                  <th className="p-2 border">Hotel</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Room Type</th>
                  <th className="p-2 border">Check-In</th>
                  <th className="p-2 border">Check-Out</th>
                </>
              ) : (
                <>
                  <th className="p-2 border">Destination</th>
                  <th className="p-2 border">Duration</th>
                  <th className="p-2 border">Hotel</th>
                  <th className="p-2 border">Travel</th>
                  <th className="p-2 border">Price</th>
                </>
              )}
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  {b.RegisterDetails?.name || "N/A"} (
                  {b.RegisterDetails?.email || "N/A"})
                </td>
                {type === "hotel" ? (
                  <>
                    <td className="p-2 border">{b.hotel_name}</td>
                    <td className="p-2 border">{b.location}</td>
                    <td className="p-2 border">{b.room_type}</td>
                    <td className="p-2 border">{b.check_in}</td>
                    <td className="p-2 border">{b.check_out}</td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border">{b.destination}</td>
                    <td className="p-2 border">
                      {b.days}D / {b.nights}N
                    </td>
                    <td className="p-2 border">{b.hotel_category}</td>
                    <td className="p-2 border">{b.travel_type}</td>
                    <td className="p-2 border">
                      Rs. {b.total_price?.toLocaleString()}
                    </td>
                  </>
                )}
                <td
                  className={`p-2 border font-semibold ${
                    b.status === "Pending"
                      ? "text-yellow-600"
                      : b.status === "Confirmed"
                      ? "text-green-600"
                      : b.status === "Cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {b.status}
                </td>
                <td className="p-2 border space-x-1">
                  <button
                    onClick={() => updateStatus(type, b.id, "Confirmed")}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(type, b.id, "Cancelled")}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateStatus(type, b.id, "Completed")}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {data.map((b) => (
          <div key={b.id} className="border rounded-lg shadow-sm p-3 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-cyan-700">
                {type === "hotel" ? b.hotel_name : b.destination}
              </h3>
              <span
                className={`text-xs font-bold ${
                  b.status === "Pending"
                    ? "text-yellow-600"
                    : b.status === "Confirmed"
                    ? "text-green-600"
                    : b.status === "Cancelled"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {b.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              👤 {b.RegisterDetails?.name || "N/A"} (
              {b.RegisterDetails?.email || "N/A"})
            </p>
            {type === "hotel" ? (
              <>
                <p className="text-sm text-gray-700 mb-1">
                  📍 {b.location} | 🏨 {b.room_type}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  ⏰ {b.check_in} → {b.check_out}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-700 mb-1">
                  🏨 {b.hotel_category} | ✈️ {b.travel_type}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  ⏱ {b.days}D / {b.nights}N
                </p>
                <p className="text-sm text-gray-800 font-semibold mb-2">
                  💰 Rs. {b.total_price?.toLocaleString()}
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus(type, b.id, "Confirmed")}
                className="flex-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(type, b.id, "Cancelled")}
                className="flex-1 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => updateStatus(type, b.id, "Completed")}
                className="flex-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-cyan-600">Admin Panel</span>
          <button
            className="md:hidden text-gray-600 hover:text-cyan-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-4 px-4 py-6">
          <button
            onClick={() => setActiveTab("tourBookings")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "tourBookings"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaSuitcase /> Tour Bookings
          </button>

          <button
            onClick={() => setActiveTab("hotelBookings")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "hotelBookings"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaHotel /> Hotel Bookings
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "users"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaUser /> Users
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "settings"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaCog /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 w-full">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <button
            className="md:hidden text-gray-600 hover:text-cyan-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={22} />
          </button>

          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Welcome, <span className="text-cyan-600">{user?.name || ""}</span>
          </h1>
        </div>

        {/* Tab Content */}
        {activeTab === "tourBookings" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">All Tour Bookings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : tourBookings.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              renderTable(tourBookings, "tour")
            )}
          </div>
        )}

        {activeTab === "hotelBookings" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">All Hotel Bookings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : hotelBookings.length === 0 ? (
              <p className="text-gray-500">No hotel bookings found.</p>
            ) : (
              renderTable(hotelBookings, "hotel")
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">Users Management</h2>
            <p className="text-gray-600">Admin can view & manage users here...</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">Admin Settings</h2>
            <p className="text-gray-600">
              Configuration options will appear here soon...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
