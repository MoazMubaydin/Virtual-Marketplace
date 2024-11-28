const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/health", async (req, res) => {
  try {
    const response = await mongoose.connection.db.admin().ping();
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("MongoDB ping failed", error);
    res.status(500).json({
      status: "error",
      message: "failed to connect to MongoDB",
    });
  }
});
module.exports = router;
