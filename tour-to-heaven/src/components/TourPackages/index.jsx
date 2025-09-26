// TourPackages.js
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import tourPackages from "../../data/tourPackages";

const TourPackages = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const visibleCount = isMobile ? 1 : 3;

  const prev = () => index > 0 && setIndex(index - 1);
  const next = () =>
    index < tourPackages.length - visibleCount && setIndex(index + 1);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [isMobile]);

  let startX = 0;
  const handleTouchStart = (e) => (startX = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 50 && index > 0) prev();
    else if (diff < -50 && index < tourPackages.length - visibleCount) next();
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-8xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Tour Packages
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <button
              onClick={prev}
              disabled={index === 0}
              className={`hidden md:flex items-center justify-center ${
                index === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-cyan-700"
              } bg-white shadow-md rounded-full`}
              style={{ width: "40px", height: `${cardHeight}px` }}
            >
              <ChevronLeft className="text-cyan-700" />
            </button>
          )}

          <div
            className="overflow-hidden w-full relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${index * cardWidth}px)` }}
            >
              {tourPackages.map((pkg, i) => (
                <div
                  key={pkg.id}
                  ref={i === 0 ? cardRef : null}
                  className={`cursor-pointer flex-shrink-0 ${
                    isMobile
                      ? "w-full flex justify-center px-4"
                      : "w-[calc(100%/3)] px-2"
                  }`}
                >
                  <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {pkg.description}
                      </p>
                      <p className="text-cyan-700 font-bold mb-1">
                        {pkg.price}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {pkg.duration}
                      </p>
                      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded transition">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <button
              onClick={next}
              disabled={index >= tourPackages.length - visibleCount}
              className={`hidden md:flex items-center justify-center ${
                index >= tourPackages.length - visibleCount
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-cyan-700"
              } bg-white shadow-md rounded-full`}
              style={{ width: "40px", height: `${cardHeight}px` }}
            >
              <ChevronRight className="text-cyan-700" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
