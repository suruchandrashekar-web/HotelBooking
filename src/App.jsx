
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./Componets/Nav";
import Footer from "./Componets/Footer";

import Home from "./Pages/Home";

import Allrooms from "./Pages/Allrooms";
import RoomDetials from "./Pages/Roomdetials";
import MyBooking from "./Pages/Mybooking";
import HotelReg from "./Componets/HotelReg";

import Layout from "./Pages/HotelOwner/Layout";
import Addroom from "./Pages/HotelOwner/Addroom";
import ListRoom from "./Pages/HotelOwner/ListRoom";
import Dashboard from "./Pages/HotelOwner/Dashboard";

const App = () => {
  const location = useLocation();

  const isOwnerPath = location.pathname.includes("/owner");

  return (
    <div>
      {/* Navbar */}
      {!isOwnerPath && <Nav />}

      {/* Hotel Registration */}
      {false && <HotelReg />}

      {/* Pages */}
      <div className="min-h-[70vh]">
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* All Rooms */}
          <Route path="/rooms" element={<Allrooms />} />

          {/* Room Details */}
          <Route path="/rooms/:id" element={<RoomDetials />} />

          {/* My Booking */}
          <Route path="/my-bookings" element={<MyBooking />} />

          {/* Owner Dashboard */}
          <Route path="/owner" element={<Layout />}>

            {/* /owner */}
            <Route index element={<Dashboard />} />

            {/* /owner/add-room */}
            <Route path="add-room" element={<Addroom />} />

            {/* /owner/list-room */}
            <Route path="list-room" element={<ListRoom />} />

          </Route>

        </Routes>
      </div>

      {/* Footer */}
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;

