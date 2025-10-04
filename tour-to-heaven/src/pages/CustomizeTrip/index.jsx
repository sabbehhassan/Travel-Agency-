import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomizeTrip = () => {
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: "",
    days: 0,
    nights: 0,
    travelType: "By Air",
    hotel: "Deluxe",
    extras: { guide: false, bonfire: false, photography: false, localFood: false },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isLoggedIn) {
    navigate("/login");
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleExtrasChange = (e) => {
    setFormData({
      ...formData,
      extras: { ...formData.extras, [e.target.name]: e.target.checked },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/customize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ FIXED
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage("✅ Trip customized successfully!");
      navigate("/dashboard");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customize Your Trip</h2>
        {message && <p className={`mb-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter destination (e.g., Skardu, Hunza)"
            />
          </div>

          {/* Days & Nights */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Days</label>
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nights</label>
              <input
                type="number"
                name="nights"
                value={formData.nights}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Travel Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Travel Type</label>
            <select
              name="travelType"
              value={formData.travelType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
            >
              <option>By Air</option>
              <option>By Road</option>
            </select>
          </div>

          {/* Hotel Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Hotel Category</label>
            <select
              name="hotel"
              value={formData.hotel}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
            >
              <option>Luxury</option>
              <option>Deluxe</option>
              <option>Standard</option>
            </select>
          </div>

          {/* Extras */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Extra Services</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData.extras).map((extra) => (
                <label key={extra} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={extra}
                    checked={formData.extras[extra]}
                    onChange={handleExtrasChange}
                    className="w-4 h-4"
                  />
                  <span className="capitalize">{extra}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md transition">
            {loading ? "Saving..." : "Save Trip"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizeTrip;
