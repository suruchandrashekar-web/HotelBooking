
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  assets,
  roomsDummyData,
} from "../assets/assets";

import Starrating from "../Componets/Starrating";


// =====================================================
// AMENITY ICON
// =====================================================

const AmenityIcon = ({ name }) => {

  // Room Service Icon
  if (name === "Room Service") {
    return (
      <svg
        className="w-5 h-5 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M4 3v18M4 7h5M4 11h4M9 3v8c0 2-1 3-2 3v7M15 3v18M15 3c3 1 4 3 4 6v4h-4"
        />
      </svg>
    );
  }


  // Mountain View Icon
  if (name === "Mountain View") {
    return (
      <svg
        className="w-5 h-5 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M3 20l7-10 4 5 2-3 5 8H3z"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M14 7a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
        />
      </svg>
    );
  }


  // Pool Access Icon
  if (name === "Pool Access") {
    return (
      <svg
        className="w-5 h-5 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M3 18c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M6 15V6a3 3 0 0 1 6 0v9"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M6 9h6"
        />
      </svg>
    );
  }


  // Default Icon
  return (
    <svg
      className="w-5 h-5 text-gray-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        strokeWidth="1.8"
      />

      <path
        strokeLinecap="round"
        strokeWidth="1.8"
        d="M12 8v8M8 12h8"
      />
    </svg>
  );
};


// =====================================================
// ROOM COMMON DATA ICON
// =====================================================

const CommonIcon = ({ index }) => {

  if (index === 0) {
    return (
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12h16M6 8h12M6 16h12"
        />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h18M12 3v18"
        />
        <circle
          cx="12"
          cy="12"
          r="8"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7h16v10H4z"
      />

      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M8 17v2M16 17v2"
      />
    </svg>
  );
};


// =====================================================
// ROOM DETAILS
// =====================================================

const RoomDetails = () => {

  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);


  // ===================================================
  // FIND ROOM
  // ===================================================

  useEffect(() => {

    const foundRoom = roomsDummyData.find(
      (room) => room._id === id
    );

    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }

  }, [id]);


  // ===================================================
  // ROOM NOT FOUND
  // ===================================================

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-gray-500 text-lg">
          Room not found
        </p>

      </div>
    );
  }


  // ===================================================
  // ROOM DETAILS PAGE
  // ===================================================

  return (

    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">


      {/* ================================================= */}
      {/* ROOM TITLE */}
      {/* ================================================= */}

      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">

        <h1 className="text-3xl md:text-4xl font-playfair">

          {room.hotel.name}

          <span className="font-inter text-sm ml-2 text-gray-500">
            ({room.roomType})
          </span>

        </h1>


        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>

      </div>


      {/* ================================================= */}
      {/* RATING */}
      {/* ================================================= */}

      <div className="flex items-center gap-1 mt-2">

        <Starrating />

        <p className="ml-2 text-sm text-gray-600">
          200+ reviews
        </p>

      </div>


      {/* ================================================= */}
      {/* LOCATION */}
      {/* ================================================= */}

      <div className="flex items-center gap-1 text-gray-500 mt-2">

        <img
          src={assets.locationIcon}
          alt="location"
          className="w-4 h-4"
        />

        <span>
          {room.hotel.address}
        </span>

      </div>


      {/* ================================================= */}
      {/* ROOM IMAGES */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row mt-6 gap-6">


        {/* MAIN IMAGE */}

        <div className="lg:w-1/2 w-full">

          <img
            src={mainImage}
            alt="Room"
            className="w-full h-[400px] rounded-xl shadow-lg object-cover"
          />

        </div>


        {/* THUMBNAILS */}

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">

          {room.images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt={`Room ${index + 1}`}
              onClick={() => setMainImage(image)}
              className={`w-full h-48 rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image
                  ? "outline-3 outline-orange-500"
                  : ""
              }`}
            />

          ))}

        </div>

      </div>


      {/* ================================================= */}
      {/* ROOM INFORMATION */}
      {/* ================================================= */}

      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-8">


        {/* AMENITIES */}

        <div className="flex flex-col">

          <h2 className="text-3xl md:text-4xl font-playfair">
            Experience Luxury Like Never Before
          </h2>


          {/* ================================================= */}
          {/* AMENITIES WITH ICONS */}
          {/* ================================================= */}

          <div className="flex flex-wrap items-center mt-4 mb-6 gap-3">

            {room.amenities.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100"
              >

                <AmenityIcon name={item} />

                <p className="text-sm text-gray-700">
                  {item}
                </p>

              </div>

            ))}

          </div>


          {/* DESCRIPTION */}

          <p className="text-sm text-gray-500 max-w-2xl leading-6">

            Enjoy a comfortable and luxurious stay with modern
            facilities, beautiful surroundings, and excellent
            hospitality.

          </p>

        </div>


        {/* ================================================= */}
        {/* PRICE */}
        {/* ================================================= */}

        <div className="flex flex-col items-start md:items-end">

          <p className="text-2xl font-medium text-gray-800">
            ${room.pricePerNight}
          </p>

          <p className="text-sm text-gray-500">
            / Night
          </p>

        </div>

      </div>


      {/* ================================================= */}
      {/* BOOKING FORM */}
      {/* ================================================= */}

      <form
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
      >

        {/* FORM INPUTS */}

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 text-gray-500 w-full">


          {/* CHECK-IN */}

          <div className="w-full md:w-auto">

            <label
              htmlFor="checkInDate"
              className="font-medium"
            >
              Check-In
            </label>

            <input
              type="date"
              id="checkInDate"
              className="block w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />

          </div>


          {/* CHECK-OUT */}

          <div className="w-full md:w-auto">

            <label
              htmlFor="checkOutDate"
              className="font-medium"
            >
              Check-Out
            </label>

            <input
              type="date"
              id="checkOutDate"
              className="block w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />

          </div>


          {/* GUESTS */}

          <div className="w-full md:w-auto">

            <label
              htmlFor="guests"
              className="font-medium"
            >
              Guests
            </label>

            <input
              type="number"
              id="guests"
              min="1"
              placeholder="1"
              className="block w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />

          </div>

        </div>


        {/* BOOK BUTTON */}

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 active:scale-95 transition-all duration-200 text-white rounded-full px-8 py-3 text-sm font-medium whitespace-nowrap cursor-pointer max-md:w-full max-md:mt-6"
        >
          Check Availability
        </button>

      </form>


      {/* ================================================= */}
      {/* ROOM COMMON INFORMATION */}
      {/* ================================================= */}

      <div className="mt-20 space-y-5">


        <div className="flex items-start gap-3">

          <CommonIcon index={0} />

          <div>

            <p className="text-base text-gray-800">
              Comfortable Stay
            </p>

            <p className="text-sm text-gray-500">
              Enjoy a comfortable and relaxing stay.
            </p>

          </div>

        </div>


        <div className="flex items-start gap-3">

          <CommonIcon index={1} />

          <div>

            <p className="text-base text-gray-800">
              Beautiful Location
            </p>

            <p className="text-sm text-gray-500">
              Enjoy beautiful surroundings and amazing views.
            </p>

          </div>

        </div>


        <div className="flex items-start gap-3">

          <CommonIcon index={2} />

          <div>

            <p className="text-base text-gray-800">
              Premium Facilities
            </p>

            <p className="text-sm text-gray-500">
              Modern facilities are available for your stay.
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* ROOM DESCRIPTION */}
      {/* ================================================= */}

      <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">

        <p className="text-sm leading-7">

          Guests will be allocated on the ground floor according
          to availability. You get a comfortable two-bedroom
          apartment that has a true city feeling. The price
          quoted is for two guests. Please select the number of
          guests to get the exact price for groups. Guests will
          be allocated on the ground floor according to
          availability.

        </p>

      </div>


      {/* ================================================= */}
      {/* HOST INFORMATION */}
      {/* ================================================= */}

      <div className="flex flex-col items-start gap-4">

        <div className="flex items-center gap-4">

          <img
            src={room.hotel.owner.image}
            alt="Host"
            className="h-14 w-14 md:h-18 md:w-18 rounded-full object-cover"
          />


          <div>

            <p className="text-lg md:text-xl text-gray-800">
              Hosted by {room.hotel.name}
            </p>


            <div className="flex items-center mt-1">

              <Starrating />

              <p className="ml-2 text-sm text-gray-500">
                200+ reviews
              </p>

            </div>

          </div>

        </div>


        {/* CONTACT BUTTON */}

        <button
          type="button"
          className="px-6 py-2.5 mt-4 rounded-lg text-white bg-primary hover:bg-primary-dull active:scale-95 transition-all cursor-pointer"
        >
          Contact Now
        </button>

      </div>

    </div>
  );
};

export default RoomDetails;
