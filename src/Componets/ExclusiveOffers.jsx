import React from "react";
import { assets, exclusiveOffers } from "../assets/assets";
import Title from "../Componets/Title";

const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">

      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title
          align="left"
          title="Exclusive Offers"
          subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />

        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
          View All Offers

          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col justify-between min-h-72 p-5 rounded-xl text-white bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >

            <div className="absolute inset-0 bg-black/30"></div>

            <p className="relative z-10 px-3 py-1 w-fit text-xs bg-white text-gray-800 font-medium rounded-full">
              {item.priceOff}% OFF
            </p>

            <div className="relative z-10">
              <p className="text-2xl font-medium font-playfair">
                {item.title}
              </p>

              <p className="mt-1 text-sm">
                {item.description}
              </p>

              <p className="text-xs text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>

              <button className="group/btn flex items-center gap-2 mt-5 px-4 py-2 bg-white text-black rounded-full text-sm font-medium cursor-pointer">
                View Offer

                <img
                  src={assets.arrowIcon}
                  alt="arrow-icon"
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-all"
                />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ExclusiveOffers;