const express = require("express");
const Payment = require("../models/Payment");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).send(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

module.exports = router;
