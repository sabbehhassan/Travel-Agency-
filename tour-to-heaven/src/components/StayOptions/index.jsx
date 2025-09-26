import React from "react";
import stayOptions from "../../data/stayoption";

const StayOptions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Stay With Us in Northern Pakistan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stayOptions.map((stay) => (
            <div
              key={stay.id}
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={stay.image}
                alt={stay.name}
                className="w-full h-60 object-contain"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {stay.name}
                </h3>
                <p className="text-sm text-cyan-700 font-medium">
                  {stay.location}
                </p>
                <p className="text-gray-600 text-sm my-2">{stay.description}</p>
                <p className="text-cyan-700 font-bold">{stay.price}</p>
                <button className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayOptions;
