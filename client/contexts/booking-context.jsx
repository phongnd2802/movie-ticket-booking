"use client";
import React, { createContext, useContext, useState } from "react";

const SeatContext = createContext();

export const BookingProvider = ({ children }) => {
  const [inforBooking, setInforBooking] = useState({
    seatIds: [null],
    cinemal: null,
    showId: null,
    movieName: null,
    movieImage: null,
    cartfood: [],
    totalPrice: null,
  });

  return (
    <SeatContext.Provider value={{ inforBooking, setInforBooking }}>
      {children}
    </SeatContext.Provider>
  );
};

export const useSeat = () => {
  const context = useContext(SeatContext);
  if (!context)
    throw new Error("useSeat must be used within a BookingProvider");
  return context;
};
