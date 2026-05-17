const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

mongoose.connect("mongodb://127.0.0.1:27017/flashcards")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const authRoutes = require("./routes/auth");
const flashcardRoutes = require("./routes/flashcards");

app.use("/api/auth", authRoutes);
app.use("/api/flashcards", flashcardRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
const historyRoutes = require("./routes/history");
app.use("/api/history", historyRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});