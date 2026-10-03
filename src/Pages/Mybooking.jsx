import React, { useState } from "react";
import Title from "../Componets/Title";
import { assets, roomsDummyData } from "../assets/assets";

const userBookingDummyData = roomsDummyData.slice(0, 3).map((room, index) => ({
  _id: `booking-${index + 1}`,
  room: room,
  guests: index + 1,
  totalPrice: room.pricePerNight * 2,
  checkInDate: "2026-09-15",
  checkOutDate: "2026-09-17",
  isPaid: index === 0,
}));

const Mybooking = () => {
  const [booking, setBooking] = useState(userBookingDummyData);

  return (
    <div className="py-28 md:pt-32 md:pb-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Booking"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">

        {/* Header */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking List */}
        {booking.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* Hotel Details */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className="w-full md:w-44 h-32 md:h-28 rounded shadow object-cover"
              />

              <div className="flex flex-col gap-1.5 max-md:mt-3 md:ml-4">
                <p className="font-playfair text-2xl text-gray-800">
                  {booking.room.hotel.name}
                  <span className="font-inter text-sm ml-1">
                    ({booking.room.roomType})
                  </span>
                </p>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img
                    src={assets.locationIcon}
                    alt="location-icon"
                    className="w-4 h-4"
                  />
                  <span>{booking.room.hotel.address}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img
                    src={assets.guestsIcon}
                    alt="guests-icon"
                    className="w-4 h-4"
                  />
                  <span>Guests: {booking.guests}</span>
                </div>

                <p className="text-base">
                  Total: ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Date & Timings */}
            <div className="flex flex-row md:items-center md:gap-12 mt-5 md:mt-0 gap-8">
              <div>
                <p className="font-medium">Check-In:</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>

              <div>
                <p className="font-medium">Check-Out:</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex flex-col items-start justify-center pt-5 md:pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>

                <p
                  className={`text-sm ${
                    booking.isPaid
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {!booking.isPaid && (
                <button
                  type="button"
                  className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mybooking;