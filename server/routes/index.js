const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/account", require("./account.routes"));
router.use("/expense-types", require("./expense-types.routes"));
router.use("/gain", require("./gain.routes"));
router.use("/payment", require("./payment.routes"));
router.use("/spending", require("./spending.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
