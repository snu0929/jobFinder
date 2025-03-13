const express = require("express");
const bcrypt = require("bcryptjs");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { auth } = require("../middlewares/auth.middleware");
require("dotenv").config();
UserRouter.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ msg: "user is already register" });
    }
    const hanshedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hanshedPassword,
      role,
    });

    await newUser.save();
    res.status(200).json({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed to register" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "password is not valid" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );
    res.status(200).json({
      message: "successful logged in",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.post("/logout", async (req, res) => {
  try {
    res.status(200).json({ msg: "logout secussfully! " });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Logout failed", error });
  }
});

UserRouter.get("/profile", auth, async (req, res) => {
  try {
    const profile = await UserModel.findById(req.user.userId).select(
      "-password"
    );

    res.status(200).json({ profile: profile });
  } catch (error) {
    res.status(500).json({ msg: "failed to fetch profile", error });
  }
});

UserRouter.put("/update-profile", auth, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "Email already exists" });
      }
      user.email = email;
    }
    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Failed to update profile" });
  }
});

module.exports = {
  UserRouter,
};
