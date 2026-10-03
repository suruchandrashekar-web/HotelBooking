
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  assets,
  roomsDummyData,
  facilityIcons,
} from "../assets/assets";

import Starrating from "../Componets/Starrating";

// Checkbox Component
const CheckBox = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />

      <span className="font-light select-none">
        {label}
      </span>
    </label>
  );
};

// Radio Button Component
const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />

      <span className="font-light select-none">
        {label}
      </span>
    </label>
  );
};

const Allrooms = () => {
  const navigate = useNavigate();

  const [openfilters, setOpenfilters] = useState(false);

  // Room Types
  const roomsTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
  ];

  // Price Ranges
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  // Sort Options
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  return (
    <div className="flex flex-col items-start pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Header */}
      <div className="flex flex-col items-start text-left w-full">
        <h1 className="font-playfair text-4xl md:text-[40px]">
          Hotel Rooms
        </h1>

        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setOpenfilters(!openfilters)}
        className="lg:hidden fixed top-24 right-4 z-40 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg"
      >
        {openfilters ? "Hide Filters" : "Filters"}
      </button>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row gap-8 mt-10">

        {/* Rooms */}
        <div className="flex-1 flex flex-col gap-8">

          {roomsDummyData.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row gap-6 border-b border-gray-200 pb-8"
            >

              {/* Image */}
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="w-full md:w-[380px] h-52 rounded-xl shadow-lg object-cover cursor-pointer"
              />

              {/* Details */}
              <div className="md:flex-1 flex flex-col gap-2">

                {/* City */}
                <p className="text-gray-500">
                  {room.hotel.city}
                </p>

                {/* Hotel Name */}
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                >
                  {room.hotel.name}
                </p>

                {/* Rating */}
                <div className="flex items-center">
                  <Starrating />

                  <p className="ml-2 text-sm">
                    200+ Reviews
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img
                    src={assets.locationIcon}
                    alt="location-icon"
                    className="w-4 h-4"
                  />

                  <span>
                    {room.hotel.address}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap items-center gap-4 mt-3 mb-4">

                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />

                      <p className="text-xs">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>

                {/* Price */}
                <p className="text-gray-800 mt-2">
                  <span className="font-semibold">
                    ${room.pricePerNight}
                  </span>

                  <span className="text-sm text-gray-500">
                    {" "}
                    / night
                  </span>
                </p>

              </div>
            </div>
          ))}

        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block bg-white w-80 border border-gray-300 text-gray-600 rounded-lg h-fit sticky top-28">

          {/* Filter Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">

            <p className="text-base font-medium text-gray-800">
              FILTERS
            </p>

            <span className="text-xs cursor-pointer">
              CLEAR
            </span>

          </div>

          {/* Filter Content */}
          <div>

            {/* Popular Filters */}
            <div className="px-5 pt-5">

              <p className="font-medium text-gray-800 pb-2">
                Popular Filters
              </p>

              {roomsTypes.map((room, index) => (
                <CheckBox
                  key={index}
                  label={room}
                />
              ))}

            </div>

            {/* Price Range */}
            <div className="px-5 pt-5">

              <p className="font-medium text-gray-800 pb-2">
                Price Range
              </p>

              {priceRanges.map((range, index) => (
                <CheckBox
                  key={index}
                  label={`$ ${range}`}
                />
              ))}

            </div>

            {/* Sort By */}
            <div className="px-5 pt-5 pb-7">

              <p className="font-medium text-gray-800 pb-2">
                Sort By
              </p>

              {sortOptions.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option}
                />
              ))}

            </div>

          </div>
        </div>

      </div>

      {/* Mobile Filters Overlay */}
      {openfilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40">

          <div className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl overflow-y-auto">

            {/* Mobile Filter Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-300">

              <p className="text-base font-medium text-gray-800">
                FILTERS
              </p>

              <button
                onClick={() => setOpenfilters(false)}
                className="text-gray-600 text-lg"
              >
                ✕
              </button>

            </div>

            {/* Popular Filters */}
            <div className="px-5 pt-5">

              <p className="font-medium text-gray-800 pb-2">
                Popular Filters
              </p>

              {roomsTypes.map((room, index) => (
                <CheckBox
                  key={index}
                  label={room}
                />
              ))}

            </div>

            {/* Price Range */}
            <div className="px-5 pt-5">

              <p className="font-medium text-gray-800 pb-2">
                Price Range
              </p>

              {priceRanges.map((range, index) => (
                <CheckBox
                  key={index}
                  label={`$ ${range}`}
                />
              ))}

            </div>

            {/* Sort By */}
            <div className="px-5 pt-5 pb-7">

              <p className="font-medium text-gray-800 pb-2">
                Sort By
              </p>

              {sortOptions.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option}
                />
              ))}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Allrooms;
