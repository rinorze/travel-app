import express from "express";
import {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
  addReview
} from "../tours/tour.controller.js";
import upload from "../../config/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createTour);

router.get("/", getTours);

router.post("/:id/addReview", addReview);

router.get("/:id", getTourById);

router.put("/:id", updateTour);

router.delete("/:id", deleteTour);

export default router;
