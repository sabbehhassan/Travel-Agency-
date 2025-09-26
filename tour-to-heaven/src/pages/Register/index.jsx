import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create your <span className="text-cyan-600">Tour to Heaven</span> account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Full Name"
              />
            </div>

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

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Confirm Password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          {/* Social Sign Up */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
              <FaGoogle className="text-red-500 mr-2" /> Google
            </button>
            <button className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
              <FaFacebookF className="text-blue-600 mr-2" /> Facebook
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image (desktop only) */}
      <div className="hidden lg:flex flex-1">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="Travel Sign Up"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
