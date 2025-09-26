import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImages from "../../data/heroimages";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[94vh] w-full bg-no-repeat bg-center bg-cover transition-all duration-1000"
      style={{
        backgroundImage: `url(${heroImages[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-white flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Explore Gilgit Baltistan
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover scenic beauty, rich culture, and unmatched adventure.
        </p>
        <Link to="/packages">
          <button className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 text-lg rounded shadow-md transition">
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
