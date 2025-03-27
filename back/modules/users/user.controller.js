// we write functions that we want to do
import User from "./user.model.js"; // database of users
import bcrypt from "bcrypt"; // to hash the password

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({ message: error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({
      createdAt: -1
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

// Get single user
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password, phoneNumber, role } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return req.status(404).json({ message: "User not found" });
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (role) {
      user.role = role;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(202).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};
