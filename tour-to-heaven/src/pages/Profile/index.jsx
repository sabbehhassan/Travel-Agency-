import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import {
  UserIcon,
  LockClosedIcon,
  CalendarIcon,
  DevicePhoneMobileIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // workflow tabs
  const [editMode, setEditMode] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || "/default-avatar.png"
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    cnic: user?.cnic || "",
    avatar: user?.avatar || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // save profile
  const handleSave = () => {
    updateProfile(formData);
    setEditMode(false);
  };

  // change password
  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("❌ New passwords do not match");
      return;
    }
    changePassword(passwordData.currentPassword, passwordData.newPassword)
      .then(() => {
        setPasswordMessage("✅ Password updated successfully");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((err) =>
        setPasswordMessage(err.message || "❌ Error updating password")
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg hidden md:flex flex-col">
        <div className="px-6 py-8 text-center border-b">
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={avatarPreview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-600 mx-auto"
            />
            <label className="absolute bottom-0 right-0 bg-cyan-600 text-white rounded-full p-1 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              ✎
            </label>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <nav className="flex-1 px-6 py-6 space-y-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 font-medium ${
              activeTab === "profile" ? "text-cyan-700" : "text-gray-600 hover:text-cyan-700"
            }`}
          >
            <UserIcon className="h-5 w-5" /> Profile Info
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 font-medium ${
              activeTab === "security" ? "text-cyan-700" : "text-gray-600 hover:text-cyan-700"
            }`}
          >
            <LockClosedIcon className="h-5 w-5" /> Security
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 font-medium ${
              activeTab === "bookings" ? "text-cyan-700" : "text-gray-600 hover:text-cyan-700"
            }`}
          >
            <CalendarIcon className="h-5 w-5" /> Booking History
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        {/* Profile Info */}
        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-xl p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-cyan-600" /> Personal Information
              </h3>
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-gray-600 text-sm">Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{user?.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 text-sm">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{user?.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-600 text-sm">Phone</label>
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-cyan-500" />
                    {user?.phone || "N/A"}
                  </p>
                )}
              </div>

              {/* CNIC */}
              <div>
                <label className="text-gray-600 text-sm">CNIC</label>
                {editMode ? (
                  <input
                    type="text"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
                    placeholder="xxxxx-xxxxxxx-x"
                  />
                ) : (
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <IdentificationIcon className="h-5 w-5 text-cyan-500" />
                    {user?.cnic || "N/A"}
                  </p>
                )}
              </div>

              {/* Member Since */}
              <div>
                <label className="text-gray-600 text-sm">Member Since</label>
                <p className="font-medium text-gray-800">
                  {user?.createdAt?.slice(0, 10) || "-"}
                </p>
              </div>
            </div>

            {editMode && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <LockClosedIcon className="h-6 w-6 text-cyan-600" /> Change Password
            </h3>
            {passwordMessage && (
              <p
                className={`mb-4 text-sm ${
                  passwordMessage.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordMessage}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePasswordChange}
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700"
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* Booking History */}
        {activeTab === "bookings" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <CalendarIcon className="h-6 w-6 text-cyan-600" /> Booking History
            </h3>
            <p className="text-gray-600">Your bookings will appear here...</p>

            {/* Sample Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Tour</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Hunza Valley Tour</td>
                    <td className="border px-4 py-2">2025-11-15</td>
                    <td className="border px-4 py-2 text-green-600">Confirmed</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Skardu Adventure</td>
                    <td className="border px-4 py-2">2025-12-02</td>
                    <td className="border px-4 py-2 text-yellow-600">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
