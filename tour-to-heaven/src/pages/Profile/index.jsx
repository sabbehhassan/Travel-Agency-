import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  UserIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

const ProfilePage = ({ embedded = false }) => {
  const { user, updateProfile, changePassword } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    avatar: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

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
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((s) => ({ ...s, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const payload = new FormData();
    ["name", "email", "phone", "cnic"].forEach((field) => {
      if (formData[field]) payload.append(field, formData[field]);
    });
    if (formData.avatar instanceof File) payload.append("avatar", formData.avatar);

    const result = await updateProfile(payload);
    alert(result.success ? "✅ Profile updated" : "❌ " + result.message);
    setEditMode(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("❌ New passwords do not match");
      return;
    }
    const result = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );
    setPasswordMessage(
      result.success ? "✅ Password updated successfully" : "❌ " + result.message
    );
    if (result.success)
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className={`${embedded ? "" : "min-h-screen bg-gray-50"} space-y-8`}>
      {/* Profile Info */}
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
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border"
              />
              {editMode && (
                <label className="bg-cyan-600 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-cyan-700">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-gray-600 text-sm">Name</label>
            {editMode ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
              />
            ) : (
              <p className="font-medium text-gray-800">{formData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            {editMode ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
              />
            ) : (
              <p className="font-medium text-gray-800">{formData.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-600 text-sm">Phone</label>
            {editMode ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
              />
            ) : (
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <DevicePhoneMobileIcon className="h-5 w-5 text-cyan-500" />
                {formData.phone || "N/A"}
              </p>
            )}
          </div>

          {/* CNIC */}
          <div>
            <label className="text-gray-600 text-sm">CNIC</label>
            {editMode ? (
              <input
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="xxxxx-xxxxxxx-x"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-500"
              />
            ) : (
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <IdentificationIcon className="h-5 w-5 text-cyan-500" />
                {formData.cnic || "N/A"}
              </p>
            )}
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

      {/* Security */}
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
              setPasswordData((s) => ({ ...s, currentPassword: e.target.value }))
            }
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((s) => ({ ...s, newPassword: e.target.value }))
            }
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData((s) => ({ ...s, confirmPassword: e.target.value }))
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
    </div>
  );
};

export default ProfilePage;
