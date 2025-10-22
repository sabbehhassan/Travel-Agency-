import React from "react";
import HeroSection from "../../components/heroSection";
import PopularDestinations from "../../components/popDestinations";
import TourPackages from "../../components/tourPackages";
import Testimonials from "../../components/testimonials";
import Gallery from "../../components/gallery";
import StayOptions from "../../components/stayOptions";

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
