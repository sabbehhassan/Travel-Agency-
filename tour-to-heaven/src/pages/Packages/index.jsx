import React from "react";
import TourPackages from "../../components/TourPackages";

const PackagesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🌄 Hero Section */}
      <section
        className="relative h-[70vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/bg/minimarg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

        <div className="relative text-center text-white px-4 sm:px-6 animate-fadeInUp">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Discover Our Tour Packages
          </h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Experience the raw beauty of Gilgit Baltistan — from snow-capped
            peaks to crystal-clear lakes, our packages are crafted for true
            adventurers.
          </p>
        </div>
      </section>

      {/* 🎯 Travel Styles Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Travel Style
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you seek adventure, family fun, or romantic escapes —
            we’ve got the perfect plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "🏔️ Adventure Tours",
              desc: "For thrill-seekers — hiking, trekking, and mountain exploration.",
              img: "/assets/travel/adventure.jpg",
            },
            {
              title: "👨‍👩‍👧 Family Trips",
              desc: "Comfortable and fun family packages with safe accommodations.",
              img: "/assets/travel/family.jpg",
            },
            {
              title: "💞 Honeymoon Escapes",
              desc: "Romantic getaways to serene lakes and cozy mountain lodges.",
              img: "/assets/travel/honeymoon.jpg",
            },
            {
              title: "🏕️ Cultural Tours",
              desc: "Discover heritage, festivals, and traditions of Gilgit Baltistan.",
              img: "/assets/travel/culture.jpg",
            },
          ].map((style, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 group"
            >
              <img
                src={style.img}
                alt={style.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {style.title}
                </h3>
                <p className="text-gray-600">{style.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


 

      {/* 💡 Travel Tips Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Travel Tips Before You Go
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🧳 Pack Smart
              </h3>
              <p className="text-gray-600">
                Carry layered clothing, comfortable shoes, and essentials for
                unpredictable mountain weather.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📅 Plan Ahead
              </h3>
              <p className="text-gray-600">
                Check seasonal conditions and make bookings early for a smooth
                and relaxed trip.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🚗 Travel Safely
              </h3>
              <p className="text-gray-600">
                Always rely on local, experienced drivers and trusted guides for
                a safe and unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
