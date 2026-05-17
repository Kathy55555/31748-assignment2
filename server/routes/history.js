const express = require("express");
const ViewHistory = require("../models/ViewHistory");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const record = await ViewHistory.create({
      userId: req.user.userId,
      flashcardId: req.body.flashcardId,
      action: req.body.action || "viewed"
    });

    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const history = await ViewHistory.find({ userId: req.user.userId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;