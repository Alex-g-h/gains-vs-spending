const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) res.status(404).json({ message: "User not found" });

    res.send(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const newUser = await User.create({
      ...req.body,
      userId: userId,
    });

    res.status(201).send(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

module.exports = router;
