import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={"/rooms/" + room._id}
      onClick={() => scrollTo(0, 0)}
      className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      {/* Hotel Image */}

      <div className="relative">
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="w-full h-52 object-cover"
        />

        {/* Best Seller */}

        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
            Best Seller
          </p>
        )}
      </div>

      {/* Hotel Details */}

      <div className="p-4 pt-5">
        {/* Hotel Name & Rating */}

        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel.name}
          </p>

          <div className="flex items-center gap-1">
            <img
              src={assets.starIconFilled}
              alt="star-icon"
              className="w-4 h-4"
            />
            <span>4.5</span>
          </div>
        </div>

        {/* Location */}

        <div className="flex items-center gap-1 text-sm mt-2">
          <img
            src={assets.locationIcon}
            alt="location-icon"
            className="w-4 h-4"
          />

          <span>{room.hotel.address}</span>
        </div>

        {/* Price & Book Button */}

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800">
            <span className="font-semibold">
              ${room.pricePerNight}
            </span>
            <span className="text-sm text-gray-500">
              {" "}
              /night
            </span>
          </p>

          <button
            type="button"
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;