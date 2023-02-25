const express = require("express");
const router = express.Router({ mergeParams: true });

// TODO: refactor similar routes implementations (account, spending, gain)

router.use("/auth", require("./auth.routes"));
router.use("/account", require("./account.routes"));
router.use("/expense-types", require("./expense-types.routes"));
router.use("/gain", require("./gain.routes"));
router.use("/payment", require("./payment.routes"));
router.use("/spending", require("./spending.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
