import React from "react";
import Hero from "../Componets/Hero";
import FeaturedDestination from "../Componets/FeaturedDestination";
import ExclusiveOffers from "../Componets/ExclusiveOffers";
import Testimonial from "../Componets/Testimonial";
import Newsltter from "../Componets/Newsltter";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <Newsltter/>
    </>
  );
};

export default Home;