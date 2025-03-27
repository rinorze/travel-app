import Tour from "./tour.model.js";

export const createTour = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      createdBy
    } = req.body;

    const image = req.file ? req.file.path : null;

    const tour = new Tour({
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
      createdBy
    });

    await tour.save();
    res.status(201).json({ message: "Tour created successfully", tour });
  } catch (error) {
    res.status(400).json({ message: "Error creating in Tour", error: error });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate("createdBy", "firstName lastName")
      .populate("reviews.user", "firstName lastName");
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findById(tourId)
      .populate("createdBy", "firstName lastName")
      .populate("reviews.user", "firstName lastName");

    if (!tour) {
      return res.status(404).json({ message: "tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    const {
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image
    } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      res.status(404).json({ message: "Tour not found" });
    }

    if (title) {
      tour.title = title;
    }

    if (description) {
      tour.description = description;
    }

    if (location) {
      tour.location = location;
    }

    if (country) {
      tour.country = country;
    }

    if (city) {
      tour.city = city;
    }

    if (price) {
      tour.price = price;
    }

    if (averageRating) {
      tour.averageRating = averageRating;
    }

    if (image) {
      tour.image = image;
    }

    await tour.save();
    res.status(202).json({ message: "Tour updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    await Tour.findByIdAndDelete(tourId);
    res.status(200).json({ message: "Tour Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

export const addReview = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const { rating, comment, user } = req.body;

    const existingReview = tour.reviews.find(
      (rev) => rev.user.toString() === user.toString()
    );

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this tour" });
    }

    const newReview = { user, rating, comment };
    tour.reviews.push(newReview);

    const totalRating = tour.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    tour.averageRating = totalRating / tour.reviews.length;

    await tour.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
