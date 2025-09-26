import React from "react";
import HeroSection from "../../components/heroSection";
import PopularDestinations from "../../components/PopularDestinations";
import TourPackages from "../../components/TourPackages";
import Testimonials from "../../components/Testimonials";
import Gallery from "../../components/Gallery";
import StayOptions from "../../components/StayOptions";

const Home = () => {
  return (
    <>
      <HeroSection />
      <PopularDestinations />
      <TourPackages />
      <StayOptions />
      <Testimonials />
      <Gallery />

      {/* Add Intro, Destinations, Contact later */}
    </>
  );
};

export default Home;
