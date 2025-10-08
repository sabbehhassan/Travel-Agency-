import React from "react";
import PopularDestinations from "../../components/PopularDestinations";
import TourPackages from "../../components/TourPackages";

const DestinationsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Discover Gilgit Baltistan
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            Explore the most breathtaking destinations and hidden gems of Northern Pakistan.
          </p>
          <button className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 transition-all duration-300 rounded-full text-white font-semibold shadow-lg">
            Start Exploring
          </button>
        </div>
      </section>

      {/* Destinations Section */}
      <div className="max-w-7xl mx-auto mt-12 px-4">
        <PopularDestinations />
      </div>

           {/* 🎒 Customization Section */}
      <TourPackages />

      {/* Travel Info Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Why Visit Gilgit Baltistan?
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Gilgit Baltistan is home to some of the highest peaks in the world, stunning valleys,
            serene lakes, and rich cultural heritage. Whether you're an adventurer, nature lover, or
            peace seeker, this region promises an unforgettable experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🏔️ Majestic Mountains</h3>
              <p className="text-gray-600">
                Explore K2, Nanga Parbat, and other towering giants surrounded by breathtaking views.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🌸 Scenic Valleys</h3>
              <p className="text-gray-600">
                Visit Hunza, Skardu, and Fairy Meadows — valleys filled with peace, color, and charm.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🏕️ Adventure Awaits</h3>
              <p className="text-gray-600">
                From trekking and camping to photography and culture, every corner is an adventure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;
