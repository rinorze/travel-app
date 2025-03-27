import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowTypes = /jpeg|jpg|png/;
  const extname = allowTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (JPEG, JPG, PNG)."), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
