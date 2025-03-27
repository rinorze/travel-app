import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "./user.controller.js";
import {
  authorized,
  isAuthenticated
} from "../../middleware/auth.middleware.js";
// Links - user.routes.js

const router = express.Router();

router.get(
  "/getAllUsers",
  isAuthenticated,
  authorized("admin", "moderator"),
  getUsers
);

router.post("/createUsers", createUser);
router.get("/getOneUser/:id", isAuthenticated, getUserById);
router.put("/updateUser/:id", isAuthenticated, updateUser); // to update something we need to use put
router.delete("/deleteUser/:id", isAuthenticated, deleteUser);

export default router;
