import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth(); // Ensure changePassword is implemented
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "/default-avatar.png");
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(formData); // implement this to save avatar & other fields
    setEditMode(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }
    changePassword(passwordData.currentPassword, passwordData.newPassword)
      .then(() => {
        setPasswordMessage("Password updated successfully");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((err) => setPasswordMessage(err.message || "Error updating password"));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-700 h-40 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative w-32 h-32">
              <img
                src={avatarPreview}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <span className="text-cyan-700 text-lg font-bold">+</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-20 px-6 pb-6">
          {/* Header & Edit Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 transition"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              ) : (
                <p className="text-gray-800">{user?.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              ) : (
                <p className="text-gray-800">{user?.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              ) : (
                <p className="text-gray-800">{user?.phone || "N/A"}</p>
              )}
            </div>

            {/* CNIC */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">CNIC</label>
              {editMode ? (
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="xxxxx-xxxxxxx-x"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              ) : (
                <p className="text-gray-800">{user?.cnic || "N/A"}</p>
              )}
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Member Since</label>
              <p className="text-gray-800">{user?.createdAt?.slice(0, 10) || "-"}</p>
            </div>
          </div>

          {/* Save Button */}
          {editMode && (
            <div className="mb-8 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Password Change Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>
            {passwordMessage && (
              <p className="mb-2 text-sm text-red-600">{passwordMessage}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePasswordChange}
                className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
