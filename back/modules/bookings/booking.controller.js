import mongoose from "mongoose";
import Booking from "./booking.model.js";
import Tour from "../tours/tour.model.js";

export const createBooking = async (req, res) => {
  try {
    const tourId = req.params.id;
    const { guests, date, user } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(400).json({ message: "Tour not found" });
    }

    const booking = new Booking({
      user,
      tour: tourId,
      guests,
      date
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const getMyBooking = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await Booking.find({ user: userId }).populate(
      "tour",
      "title location price"
    );

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "canceled";
    await booking.save();
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};
