import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaSuitcase, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../Profile"; // 👈 ProfilePage ko embed karenge

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout, user, token } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings"); // default
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
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, navigate, activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-100">
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
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "bookings"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaSuitcase /> My Bookings
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 w-full text-left ${
              activeTab === "profile"
                ? "text-cyan-600 font-semibold"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <FaUser /> Profile
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

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 w-full">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden text-gray-600 hover:text-cyan-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={22} />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back,{" "}
            <span className="text-cyan-600">{user?.name || "Loading..."}</span>!
          </h1>
        </div>

        {/* Tabs */}
        {activeTab === "bookings" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Destination</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="p-2 border">{b.destination}</td>
                      <td className="p-2 border">{b.date}</td>
                      <td
                        className={`p-2 border font-semibold ${
                          b.status === "Confirmed"
                            ? "text-cyan-600"
                            : b.status === "Completed"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {b.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <ProfilePage embedded /> // 👈 profile component ko embed kiya
        )}

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
