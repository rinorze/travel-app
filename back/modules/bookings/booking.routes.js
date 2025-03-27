import express from "express";
import {
  createBooking,
  getMyBooking,
  cancelBooking
} from "./booking.controller.js";

const router = express.Router();

router.post("/:id/booking", createBooking);
router.get("/myBookings/:id", getMyBooking);
router.delete("/:id/cancel", cancelBooking);

export default router;
