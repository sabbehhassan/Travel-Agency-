import React from "react";
import galleryImages from "../../data/galleryImages";

const Gallery = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Travel Moments Gallery
        </h2>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300 break-inside-avoid"
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
