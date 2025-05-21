"use client";

import { createContext, useContext, useState } from "react";

// Default empty booking info
const defaultBookingInfo = {
  seatIds: [],
  cinemaHall: "",
  showId: "",
  movieName: "",
  movieImage: "",
  cartfood: [],
  totalPrice: 0,
};

// Create context
const BookingContext = createContext(undefined);

// Provider component
export const BookingProvider = ({ children }) => {
  const [inforBooking, setInforBooking] = useState(defaultBookingInfo);

  // Add a food item to cart
  const addFoodItem = (item) => {
    setInforBooking((prev) => {
      // Check if item already exists
      const existingItemIndex = prev.cartfood.findIndex(
        (food) => food.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedCart = [...prev.cartfood];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + item.quantity,
        };

        return {
          ...prev,
          cartfood: updatedCart,
          totalPrice: prev.totalPrice + item.price * item.quantity,
        };
      } else {
        // Add new item
        return {
          ...prev,
          cartfood: [...prev.cartfood, item],
          totalPrice: prev.totalPrice + item.price * item.quantity,
        };
      }
    });
  };

  // Remove a food item from cart
  const removeFoodItem = (itemId) => {
    setInforBooking((prev) => {
      const itemToRemove = prev.cartfood.find((food) => food.id === itemId);
      if (!itemToRemove) return prev;

      return {
        ...prev,
        cartfood: prev.cartfood.filter((food) => food.id !== itemId),
        totalPrice:
          prev.totalPrice - itemToRemove.price * itemToRemove.quantity,
      };
    });
  };

  // Update food item quantity
  const updateFoodItemQuantity = (itemId, quantity) => {
    setInforBooking((prev) => {
      const itemIndex = prev.cartfood.findIndex((food) => food.id === itemId);
      if (itemIndex === -1) return prev;

      const oldItem = prev.cartfood[itemIndex];
      const priceDifference = (quantity - oldItem.quantity) * oldItem.price;

      const updatedCart = [...prev.cartfood];
      updatedCart[itemIndex] = {
        ...oldItem,
        quantity,
      };

      return {
        ...prev,
        cartfood: updatedCart,
        totalPrice: prev.totalPrice + priceDifference,
      };
    });
  };

  // Clear booking information
  const clearBooking = () => {
    setInforBooking(defaultBookingInfo);
  };

  return (
    <BookingContext.Provider
      value={{
        inforBooking,
        setInforBooking,
        addFoodItem,
        removeFoodItem,
        updateFoodItemQuantity,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
export const useSeat = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useSeat must be used within a BookingProvider");
  }
  return context;
};
