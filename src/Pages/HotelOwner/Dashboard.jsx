
import React, { useState } from "react";
import Title from "../../Componets/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);

  return (
    <div className="p-4 md:p-8">

      {/* Dashboard Title */}
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subtitle="Monitor your room listings, track bookings and analyze revenue - all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-4 my-8">

        {/* Total Bookings */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg flex items-center p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="total booking"
            className="max-sm:hidden h-10"
          />

          <div className="sm:ml-4">
            <p className="font-medium text-gray-700">
              Total Bookings
            </p>

            <p className="text-neutral-400 text-base mt-1">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg flex items-center p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="total revenue"
            className="max-sm:hidden h-10"
          />

          <div className="sm:ml-4">
            <p className="font-medium text-gray-700">
              Total Revenue
            </p>

            <p className="text-neutral-400 text-base mt-1">
              ${dashboardData.totalRevenue}
            </p>
          </div>
        </div>

      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Bookings
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto">

        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">
                User Name
              </th>

              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>

              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>

              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-sm">

            {dashboardData.bookings.map((item, index) => (
              <tr key={item._id || index}>

                {/* User Name */}
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>

                {/* Room Name */}
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room.roomType}
                </td>

                {/* Total Amount */}
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  ${item.totalPrice}
                </td>

                {/* Payment Status */}
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  <button
                    type="button"
                    className={`py-1 px-3 text-xs rounded-full ${
                      item.isPaid
                        ? "bg-green-200 text-green-600"
                        : "bg-amber-200 text-yellow-600"
                    }`}
                  >
                    {item.isPaid ? "Completed" : "Pending"}
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Dashboard;

