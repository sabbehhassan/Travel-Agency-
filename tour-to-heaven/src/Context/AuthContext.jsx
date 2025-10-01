import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();
const API_URL = "http://localhost:5000/api/users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ Load user when token exists
  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.message) {
            setUser(data);
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, [token]);

  // ✅ Login
  const login = (userData, authToken) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(authToken);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  // ✅ Update Profile (name, email, phone, cnic, avatar)
  const updateProfile = async (profileData) => {
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        if (profileData[key]) {
          formData.append(key, profileData[key]);
        }
      });

      const res = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      // ✅ Update frontend user + localStorage
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true };
    } catch (err) {
      console.error("Profile update error:", err.message);
      return { success: false, message: err.message };
    }
  };

  // ✅ Change Password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await fetch(`${API_URL}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password update failed");

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
