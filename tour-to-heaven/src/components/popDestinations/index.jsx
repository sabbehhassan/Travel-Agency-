import React from "react";
import popularDestinations from "../../data/popularDestinations";

const PopularDestinations = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Popular Destinations in Gilgit Baltistan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 group"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
