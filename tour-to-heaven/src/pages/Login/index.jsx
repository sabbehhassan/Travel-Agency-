import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        formData
      );
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      login(user, token);

      setMessage("✅ Login successful!");
      navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Login failed"}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white px-3 py-4 sm:px-2 lg:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Login to <span className="text-cyan-600">Tour to Heaven</span>
          </h2>

          {message && (
            <p
              className={`mb-4 text-center ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Password"
            />

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-cyan-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
              <FaGoogle className="text-red-500 mr-2" /> Google
            </button>
            <button className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
              <FaFacebookF className="text-blue-600 mr-2" /> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            New to Tour to Heaven?{" "}
            <a href="/register" className="text-cyan-600 hover:underline">
              Register now
            </a>
          </p>
        </div>
      </div>

      {/* ✅ Right Side - Shangrila Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src="/assets/Loginpic/shangrila-min.jpg"
          alt="Shangrila Resort"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
