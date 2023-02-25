const express = require("express");
const Spending = require("../models/Spending");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const spending = await Spending.find();
    res.send(spending);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.put("/:spendingId", auth, async (req, res) => {
  try {
    const { spendingId } = req.params;
    const newSpending = await Spending.create({
      ...req.body,
      spendingId,
    });

    res.status(201).send(newSpending);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.delete("/:spendingId", auth, async (req, res) => {
  try {
    const { spendingId } = req.params;
    const removedSpending = await Spending.findById(spendingId);

    if (removedSpending.userId.toString() === req.user._id) {
      await removedSpending.remove();
      res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.patch("/:spendingId", auth, async (req, res) => {
  try {
    const { spendingId } = req.params;

    const spendingToUpdate = await Spending.findById(spendingId);
    if (!spendingToUpdate)
      res.status(404).json({ message: "Spending not found" });

    if (spendingToUpdate.userId.toString() === req.user._id) {
      const updatedSpending = await Spending.findByIdAndUpdate(
        spendingId,
        req.body,
        {
          new: true,
        }
      );
      res.send(updatedSpending);
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
