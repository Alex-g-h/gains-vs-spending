const express = require("express");
const Account = require("../models/Account");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const account = await Account.find();
    res.send(account);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.put("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const newAccount = await Account.create({
      ...req.body,
      accountId,
    });

    res.status(201).send(newAccount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later", error });
  }
});

router.delete("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const removedAccount = await Account.findById(accountId);

    if (removedAccount.userId.toString() === req.user._id) {
      await removedAccount.remove();
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

router.patch("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;

    const accountToUpdate = await Account.findById(accountId);
    if (!accountToUpdate)
      res.status(404).json({ message: "Account not found" });

    if (accountToUpdate.userId.toString() === req.user._id) {
      const updatedAccount = await Account.findByIdAndUpdate(
        accountId,
        req.body,
        {
          new: true,
        }
      );
      res.send(updatedAccount);
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
