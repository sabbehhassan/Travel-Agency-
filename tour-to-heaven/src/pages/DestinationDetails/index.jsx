import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Hotel, Utensils, Calendar, Image as ImageIcon } from "lucide-react";
import destinations from "../../data/destinations";

const DestinationDetails = () => {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className="text-center py-20 text-gray-700 text-xl">
        Destination not found.
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* HERO SECTION */}
        <div className="relative mb-10">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
            <p className="max-w-2xl text-lg">{destination.shortDescription}</p>
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex items-center mb-6">
          <MapPin className="text-cyan-700 mr-2" />
          <p className="text-gray-700 text-lg">
            {destination.location}{" "}
            <a
              href={destination.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 hover:underline ml-2"
            >
              (View on Google Maps)
            </a>
          </p>
        </div>

        {/* HISTORY / DESCRIPTION */}
        <div
          className="prose prose-lg max-w-none text-gray-700 mb-14"
          dangerouslySetInnerHTML={{ __html: destination.history }}
        />

        {/* HIGHLIGHTS SECTION */}
        <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
          Top Highlights
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {destination.highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-cyan-700">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SEASONAL GALLERY */}
        <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
          Best Time to Visit
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {destination.travelInfo.bestTime.map((season, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={season.image}
                alt={season.season}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-cyan-700" size={18} />
                  <h3 className="text-lg font-semibold text-cyan-700">
                    {season.season}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{season.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ACCOMMODATION SECTION */}
        <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center flex justify-center items-center gap-2">
          <Hotel className="text-cyan-700" /> Where to Stay
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {destination.accommodations.map((acc, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-cyan-700 mb-3">
                {acc.type}
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {acc.list.map((place, i) => (
                  <li key={i}>{place}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CUISINE SECTION */}
        <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center flex justify-center items-center gap-2">
          <Utensils className="text-cyan-700" /> Local Cuisine
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {destination.cuisine.map((dish, index) => (
            <span
              key={index}
              className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-cyan-200 transition"
            >
              {dish}
            </span>
          ))}
        </div>

        {/* GALLERY */}
        <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center flex justify-center items-center gap-2">
          <ImageIcon className="text-cyan-700" /> Gallery
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...destination.highlights.map((h) => h.image)].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Gallery"
              className="w-full h-65 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationDetails;
