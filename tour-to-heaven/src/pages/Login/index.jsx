import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-3 py-4 sm:px-2 lg:p-8">
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Login to <span className="text-cyan-600">Tour to Heaven</span>
    </h2>


          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Password"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-cyan-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
              <FaGoogle className="text-red-500 mr-2" /> Google
            </button>
            <button className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
              <FaFacebookF className="text-blue-600 mr-2" /> Facebook
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            New to Tour to Heaven?{" "}
            <a href="/register" className="text-cyan-600 hover:underline">
              Register now
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image (desktop only) */}
      <div className="hidden lg:flex flex-1">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
