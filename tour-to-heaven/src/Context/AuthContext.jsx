// src/Context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

const AuthContext = createContext(null);

/**
 * AuthProvider
 * - Keeps user and token in state + localStorage
 * - On mount tries to restore token & user and then fetches /me to sync
 * - Exposes login/logout/updateProfile/changePassword
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });

  // Sync localStorage whenever user/token changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  // On token (app load or token change) fetch fresh user from /me
  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data) {
          setUser(data);
        } else {
          // token invalid or expired -> clear
          logout();
        }
      } catch (err) {
        console.error("Auth /me error:", err);
        logout();
      }
    };
    load();
    // only watch token
  }, [token]);

  // login expects server response shape: { user: {...}, token }
  const login = (serverUser, serverToken) => {
    if (!serverToken || !serverUser) return;
    setToken(serverToken);
    setUser(serverUser);
    // localStorage will be updated by effect
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  /**
   * updateProfile
   * Accepts either:
   *  - FormData (already built, for file upload)
   *  - plain object { name, email, phone, cnic, avatar }
   *
   * Returns { success: boolean, user?, message? }
   */
  const updateProfile = async (profileData) => {
    try {
      let body;
      if (profileData instanceof FormData) {
        body = profileData;
      } else {
        body = new FormData();
        Object.keys(profileData).forEach((k) => {
          const v = profileData[k];
          if (v !== undefined && v !== null && v !== "") body.append(k, v);
        });
      }

      const res = await fetch(`${API_BASE}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // DON'T set Content-Type — browser will set multipart/form-data with boundary
        },
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data?.message || "Profile update failed";
        throw new Error(msg);
      }

      // data.user expected
      if (data.user) {
        setUser(data.user);
      }
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Profile update error:", err.message);
      return { success: false, message: err.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Password change failed");
      }
      return { success: true };
    } catch (err) {
      console.error("Password update error:", err.message);
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateProfile,
        changePassword,
        isLoggedIn: !!token,
        setUser, // exposed for advanced cases (optional)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
