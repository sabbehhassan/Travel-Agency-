import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const AllReviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTestimonials = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonials`);
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTestimonials();
  }, []);

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          All Reviews
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">
            No testimonials available yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={
                      t.RegisterDetails?.avatar || "/images/default-profile.jpg"
                    }
                    alt={t.RegisterDetails?.name || "Client"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.RegisterDetails?.name || "Anonymous"}
                  </h3>

                  <div className="flex justify-center my-2">
                    {[...Array(t.rating || 0)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm italic">
                    “{t.review}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReviews;
