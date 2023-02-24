const express = require("express");
const ExpenseType = require("../models/ExpenseType");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const expenseTypes = await ExpenseType.find();
    res.status(200).send(expenseTypes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

module.exports = router;
