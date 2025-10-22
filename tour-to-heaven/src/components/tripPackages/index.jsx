import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const TourPackages = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    if (!isLoggedIn) {
      // Guest → force login
      navigate("/login");
    } else {
      // Logged in → go to customization page
      navigate("/customize-trip");
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-8xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Customize Your Tour Packages
          </h2>
          <p className="text-gray-600">
            Select destinations, duration, and services to build your own package.
          </p>
        </div>

        {/* Instead of showing fixed cards, show CTA */}
        <div className="flex justify-center">
          <button
            onClick={handleCustomizeClick}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg text-lg transition"
          >
            {isLoggedIn ? "Start Customizing" : "Login to Customize"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
