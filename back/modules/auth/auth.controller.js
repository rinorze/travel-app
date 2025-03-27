import User from "../users/user.model.js";
import jwt from "jsonwebtoken"; // encryption, that sends strings
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const email = req.body.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials email" });
    }

    const payload = {
      id: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "8h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};
