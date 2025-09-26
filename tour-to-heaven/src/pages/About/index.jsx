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
      {/* Hero */}
      <section className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          We are passionate about creating unforgettable travel experiences that
          connect people with the world.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 bg-white">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To provide exceptional travel experiences that inspire, educate, and
            enrich the lives of our customers.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To become the most trusted travel company, connecting people with
            cultures and destinations around the world.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          With over 10 years of experience, we offer customized tours, 24/7
          support, and unbeatable prices for unforgettable adventures.
        </p>
      </section>

      {/* Our Team */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 object-cover mx-auto rounded-full shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
