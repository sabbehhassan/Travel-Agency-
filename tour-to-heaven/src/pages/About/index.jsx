import React from "react";

const team = [
  {
    name: "Ali Khan",
    role: "Founder & CEO",
    image: "/images/team1.jpg",
  },
  {
    name: "Sara Ahmed",
    role: "Travel Consultant",
    image: "/images/team2.jpg",
  },
  {
    name: "Usman Raza",
    role: "Tour Guide",
    image: "/images/team3.jpg",
  },
  {
    name: "Nadia Shaikh",
    role: "Customer Support",
    image: "/images/team4.jpg",
  },
];

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-700 to-blue-500 text-white py-24 text-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Discover the World with <span className="text-yellow-300">Tour to Heaven</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            4 years of experience in crafting flexible, reliable, and memorable
            travel experiences for both locals and international tourists.
          </p>
        </div>
      </section>

      {/* About Description */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/assets/about/travel.jpg"
            alt="About Tour to Heaven"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-cyan-700">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            At <span className="font-semibold text-cyan-700">Tour to Heaven</span>, 
            we believe travel is more than just sightseeing — it’s about connection, 
            adventure, and unforgettable memories. For the past 4 years, 
            we’ve guided thousands of local and international travelers through 
            Pakistan’s most breathtaking destinations.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From customized tour packages to hotel bookings and adventure trips, 
            we handle everything with flexibility, trust, and reliability. 
            Whether you’re seeking peaceful valleys, thrilling treks, 
            or cultural experiences — we make your journey seamless and full of joy.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 text-center px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-8 text-cyan-700">
          Why Choose Tour to Heaven?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">
              🌍 Expert Local Guidance
            </h3>
            <p className="text-gray-600">
              Our experienced guides know every hidden gem and ensure 
              an authentic travel experience for both locals and foreigners.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">
              🏨 Reliable Hotel Booking
            </h3>
            <p className="text-gray-600">
              We provide comfortable, verified, and affordable hotel bookings 
              that fit your budget and style — no stress, just comfort.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3 text-cyan-600">
              🕒 Flexible & Safe Trips
            </h3>
            <p className="text-gray-600">
              We customize trips according to your time, needs, and preferences 
              — offering safety, flexibility, and reliability at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-700">
          Meet Our Dedicated Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-36 h-36 object-cover mx-auto rounded-full shadow-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-500 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Let’s Make Your Next Trip Unforgettable!
        </h2>
        <p className="mb-6 text-gray-100">
          Whether you’re exploring locally or traveling abroad — we’ve got you covered.
        </p>
        <a
          href="/contact"
          className="bg-white text-cyan-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;
