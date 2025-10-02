// src/pages/Profile/index.jsx
import React, { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    avatar: "", // will hold File when editing
  });

  const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  // Keep local form in sync with the authenticated user.
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        cnic: user.cnic || "",
        avatar: "",
      });
      setAvatarPreview(user.avatar || "/default-avatar.png");
    } else {
      // If no user (logged out) reset
      setFormData({
        name: "",
        email: "",
        phone: "",
        cnic: "",
        avatar: "",
      });
      setAvatarPreview("/default-avatar.png");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((s) => ({ ...s, avatar: file }));
    // show local preview using object URL (faster & not base64)
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    // revoke URL later not necessary here; browser will free on unload.
  };

  const handleSave = async () => {
    // build FormData only with changed values
    const payload = new FormData();
    if (formData.name) payload.append("name", formData.name);
    if (formData.email) payload.append("email", formData.email);
    if (formData.phone) payload.append("phone", formData.phone);
    if (formData.cnic) payload.append("cnic", formData.cnic);
    if (formData.avatar && formData.avatar instanceof File) {
      payload.append("avatar", formData.avatar);
    }

    const result = await updateProfile(payload);
    if (result.success) {
      // Optionally show a toast, here a simple alert:
      alert("✅ Profile updated");
    } else {
      alert("❌ " + (result.message || "Unable to update profile"));
    }
    setEditMode(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("❌ New passwords do not match");
      return;
    }
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (result.success) {
      setPasswordMessage("✅ Password updated successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setPasswordMessage("❌ " + (result.message || "Password update failed"));
    }
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
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-800">{formData.name}</h2>
          <p className="text-sm text-gray-500">{formData.email}</p>
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
        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-xl p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-cyan-600" /> Personal Information
              </h3>
              <button
                onClick={() => setEditMode((s) => !s)}
                className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avatar */}
              <div>
                <label className="text-gray-600 text-sm">Profile Picture</label>
                <div className="flex items-center gap-4 mt-1">
                  <img src={avatarPreview} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
                  {editMode && (
                    <label className="bg-cyan-600 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-cyan-700">
                      Change
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-gray-600 text-sm">Name</label>
                {editMode ? (
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500" />
                ) : (
                  <p className="font-medium text-gray-800">{formData.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 text-sm">Email</label>
                {editMode ? (
                  <input name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500" />
                ) : (
                  <p className="font-medium text-gray-800">{formData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-600 text-sm">Phone</label>
                {editMode ? (
                  <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500" />
                ) : (
                  <p className="font-medium text-gray-800 flex items-center gap-2"><DevicePhoneMobileIcon className="h-5 w-5 text-cyan-500" /> {formData.phone || "N/A"}</p>
                )}
              </div>

              {/* CNIC */}
              <div>
                <label className="text-gray-600 text-sm">CNIC</label>
                {editMode ? (
                  <input name="cnic" value={formData.cnic} onChange={handleChange} placeholder="xxxxx-xxxxxxx-x" className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500" />
                ) : (
                  <p className="font-medium text-gray-800 flex items-center gap-2"><IdentificationIcon className="h-5 w-5 text-cyan-500" /> {formData.cnic || "N/A"}</p>
                )}
              </div>

              {/* Member Since */}
              <div>
                <label className="text-gray-600 text-sm">Member Since</label>
                <p className="font-medium text-gray-800">{user?.createdAt?.slice(0, 10) || "-"}</p>
              </div>
            </div>

            {editMode && (
              <div className="mt-6 flex justify-end">
                <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Save Changes</button>
              </div>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6"><LockClosedIcon className="h-6 w-6 text-cyan-600" /> Change Password</h3>

            {passwordMessage && <p className={`mb-4 text-sm ${passwordMessage.includes("✅") ? "text-green-600" : "text-red-600"}`}>{passwordMessage}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input type="password" placeholder="Current Password" value={passwordData.currentPassword} onChange={(e) => setPasswordData(s => ({ ...s, currentPassword: e.target.value }))} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500" />
              <input type="password" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData(s => ({ ...s, newPassword: e.target.value }))} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500" />
              <input type="password" placeholder="Confirm Password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData(s => ({ ...s, confirmPassword: e.target.value }))} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={handlePasswordChange} className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700">Update Password</button>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6"><CalendarIcon className="h-6 w-6 text-cyan-600" /> Booking History</h3>
            <p className="text-gray-600">Your bookings will appear here...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
