import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ali Khan",
    image: "/images/client1.jpg",
    rating: 5,
    review: "It was an amazing trip! Everything was well-organized and smooth.",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    image: "/images/client2.jpg",
    rating: 4,
    review: "Great experience, especially the guide was very helpful!",
  },
  {
    id: 3,
    name: "John Doe",
    image: "/images/client3.jpg",
    rating: 5,
    review: "Beautiful locations and professional team. Highly recommended!",
  },
  // Add more as needed
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What Our Clients Say
        </h2>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8 justify-center items-center">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-100 rounded-lg shadow-md p-6 max-w-sm w-full text-center hover:shadow-xl transition"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2 border-cyan-500"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {testimonial.name}
              </h3>
              <div className="flex justify-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
