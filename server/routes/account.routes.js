const express = require("express");
const Account = require("../models/Account");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

router.patch("/:id", async (req, res) => {});

module.exports = router;
