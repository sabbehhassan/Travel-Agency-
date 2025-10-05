import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaSuitcase,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, token, user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Fetch Bookings
  const fetchBookings = async () => {
    if (!token || user?.role !== "admin") return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/admin/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");

      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Admin Fetch Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadBookings = async () => {
    if (user?.role === "admin" && token && activeTab === "bookings") {
      await fetchBookings();
    }
  };
  loadBookings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user, token, activeTab]);


  // ✅ Update booking status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/admin/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: data.booking.status } : b
        )
      );
    } catch (err) {
      console.error(err.message);
      alert("❌ Failed to update booking");
    }
  };

  // ✅ Redirect non-admins
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50
        ${
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
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "bookings"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaSuitcase /> All Bookings
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

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">All Bookings</h2>

            {loading ? (
              <p>Loading bookings...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              <>
                {/* 🖥 Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Destination</th>
                        <th className="p-2 border">Duration</th>
                        <th className="p-2 border">Hotel</th>
                        <th className="p-2 border">Travel</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="p-2 border">
                            {b.RegisterDetails?.name || "N/A"} (
                            {b.RegisterDetails?.email || "N/A"})
                          </td>
                          <td className="p-2 border">{b.destination}</td>
                          <td className="p-2 border">
                            {b.days}D / {b.nights}N
                          </td>
                          <td className="p-2 border">{b.hotel_category}</td>
                          <td className="p-2 border">{b.travel_type}</td>
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
                          <td className="p-2 border">
                            Rs. {b.total_price.toLocaleString()}
                          </td>
                          <td className="p-2 border space-x-1">
                            <button
                              onClick={() => updateStatus(b.id, "Confirmed")}
                              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, "Cancelled")}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, "Completed")}
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
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="border rounded-lg shadow-sm p-3 bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-cyan-700">
                          {b.destination}
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
                      <p className="text-sm text-gray-700 mb-1">
                        🏨 {b.hotel_category} | 🚗 {b.travel_type}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        ⏱ {b.days}D / {b.nights}N
                      </p>
                      <p className="text-sm text-gray-800 font-semibold mb-2">
                        💰 Rs. {b.total_price.toLocaleString()}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(b.id, "Confirmed")}
                          className="flex-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, "Cancelled")}
                          className="flex-1 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, "Completed")}
                          className="flex-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Users Management
            </h2>
            <p className="text-gray-600">
              Admin can view & manage users here...
            </p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Admin Settings
            </h2>
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
