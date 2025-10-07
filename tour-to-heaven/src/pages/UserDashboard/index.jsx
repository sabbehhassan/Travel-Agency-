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
import ProfilePage from "../Profile";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout, user, token } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (activeTab !== "bookings") return;
      try {
        if (!token) return navigate("/login");

        const res = await fetch("http://localhost:5000/api/users/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch bookings");

        setBookings(data.bookings || []);
      } catch (err) {
        console.error("❌ Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, navigate, activeTab]);

  // ✅ Cancel booking
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/bookings/${id}/cancel`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to cancel booking");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
      );
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
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
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

      {/* Overlay (mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 w-full overflow-x-hidden">
        {/* Top Navbar */}
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

        {/* Content Tabs */}
        {activeTab === "bookings" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-bold mb-4">My Bookings</h2>

            {loading ? (
              <p>Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              <>
                {/* ✅ Desktop View (Table) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border text-sm sm:text-base">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">Destination</th>
                        <th className="p-2 border">Duration</th>
                        <th className="p-2 border">Hotel</th>
                        <th className="p-2 border">Travel</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border text-center">Action</th>
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
                                : b.status === "Completed"
                                ? "text-green-600"
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
                                onClick={() => handleCancel(b.id)}
                                className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
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

                {/* ✅ Mobile View (Cards) */}
                <div className="md:hidden space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-cyan-700 text-lg">
                          {b.destination}
                        </h3>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded ${
                            b.status === "Confirmed"
                              ? "bg-cyan-100 text-cyan-600"
                              : b.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : b.status === "Cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <div className="text-gray-700 text-sm space-y-1">
                        <p>
                          <span className="font-medium">Duration:</span>{" "}
                          {b.days} Days / {b.nights} Nights
                        </p>
                        <p>
                          <span className="font-medium">Hotel:</span>{" "}
                          {b.hotel_category}
                        </p>
                        <p>
                          <span className="font-medium">Travel:</span>{" "}
                          {b.travel_type}
                        </p>
                        <p>
                          <span className="font-medium">Price:</span> Rs.{" "}
                          {b.total_price?.toLocaleString()}
                        </p>
                      </div>

                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="w-full mt-3 bg-red-500 text-white py-1.5 rounded hover:bg-red-600 transition-all duration-200 text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "profile" && <ProfilePage embedded />}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">
              Settings options will appear here...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
