const express = require("express");
const Gain = requires("../models/Gain");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

router.patch("/:id", async (req, res) => {});

module.exports = router;
