const express = require("express");
const Gain = require("../models/Gain");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const gain = await Gain.find();
    res.send(gain);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.put("/:gainId", auth, async (req, res) => {
  try {
    const { gainId } = req.params;
    const newGain = await Gain.create({
      ...req.body,
      gainId,
    });

    res.status(201).send(newGain);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.delete("/:gainId", auth, async (req, res) => {
  try {
    const { gainId } = req.params;
    const removedGain = await Gain.findById(gainId);

    if (removedGain.userId.toString() === req.user._id) {
      await removedGain.remove();
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

router.patch("/:gainId", auth, async (req, res) => {
  try {
    const { gainId } = req.params;

    const gainToUpdate = await Gain.findById(gainId);
    if (!gainToUpdate) res.status(404).json({ message: "Gain not found" });

    if (gainToUpdate.userId.toString() === req.user._id) {
      const updatedGain = await Gain.findByIdAndUpdate(gainId, req.body, {
        new: true,
      });
      res.send(updatedGain);
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
