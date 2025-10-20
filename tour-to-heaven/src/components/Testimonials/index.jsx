import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/testimonials`
      );
      const data = await res.json();

      // Filter: Only ratings >= 4
      const highRated = (Array.isArray(data) ? data : []).filter(
        (t) => t.rating >= 4
      );

      // Shuffle randomly and pick 3
      const randomThree = highRated.sort(() => 0.5 - Math.random()).slice(0, 3);

      setTestimonials(randomThree);
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit new testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("⚠️ Please log in to submit your testimonial.");
      navigate("/login");
      return;
    }

    if (!rating || !review) {
      setMessage("⚠️ Please provide both rating and review.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/testimonials`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            rating,
            review,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Testimonial submitted successfully!");
        setReview("");
        setRating(0);
        fetchTestimonials();
      } else {
        setMessage(`❌ ${data.message || "Submission failed"}`);
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setMessage("❌ Server error. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What Our Clients Say
        </h2>

        {/* Add Testimonial */}
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Share Your Experience
          </h3>

          {!isLoggedIn ? (
            <div className="text-center">
              <p className="mb-3 text-gray-700">
                You need to log in to leave a testimonial.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6 text-gray-700"
            >
              {/* Rating */}
              <div className="text-center">
                <h4 className="text-lg font-medium mb-2">Your Rating</h4>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={28}
                      onClick={() => setRating(num)}
                      className={`cursor-pointer transition-transform hover:scale-110 ${
                        num <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review */}
              <div>
                <h4 className="text-lg font-medium mb-2 text-center">
                  Your Review
                </h4>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="4"
                  placeholder="Write about your experience..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}

          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>

        {/* Testimonials List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">
            No testimonials available yet.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={
                        t.RegisterDetails?.avatar ||
                        "/images/default-profile.jpg"
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

                    <p className="text-gray-600 text-sm italic">“{t.review}”</p>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <button
                onClick={() => navigate("/reviews")}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2 rounded-lg font-medium transition"
              >
                See More Reviews
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
