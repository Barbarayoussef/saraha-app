import { userModel } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateBothToken,
  generateAccessToken,
} from "../../common/middleware/auth.js";

export const signup = async (req, res) => {
  let { name, email, password, confirmPassword, shareProfileName } = req.body;
  let emailCheck = await userModel.findOne({ email });
  if (emailCheck) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirm password does not match" });
  }
  const profileNameCheck = await userModel.findOne({ shareProfileName });
  if (profileNameCheck) {
    return res.status(400).json({ message: "Profile name already exists" });
  }
  let image = "";
  if (req.file) {
    image = `http://localhost:3000/uploads/${req.file.filename}`;
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  let newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    shareProfileName,

    image,
  });
  return res
    .status(200)
    .json({ message: "User created successfully", newUser });
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  let { accessToken, refreshToken } = generateBothToken(user);
  return res
    .status(200)
    .json({ message: "Login successful", accessToken, refreshToken });
};

export const generateNewAccessToken = async (req, res) => {
  let id = req.user.id;
  let user = await userModel.findById(id);
  let { accessToken } = generateAccessToken(user);
  return res
    .status(200)
    .json({ message: "Token generated successfully", accessToken });
};
