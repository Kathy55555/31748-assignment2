const express = require("express");
const Flashcard = require("../models/Flashcard");
const auth = require("../middleware/auth");

const router = express.Router();


// CREATE flashcard (logged-in user only)
router.post("/", auth, async (req, res) => {
  try {
    const card = new Flashcard({
      question: req.body.question,
      answer: req.body.answer,
      userId: req.user.userId
    });

    await card.save();
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET flashcards (only this user’s cards)
router.get("/", auth, async (req, res) => {
  try {
    const cards = await Flashcard.find({ userId: req.user.userId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE flashcard (only owner)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Flashcard.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// DELETE flashcard (only owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Flashcard.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;