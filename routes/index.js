const express = require("express");
const router = express.Router();
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Handle requests to the root route
router.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages: messages });
});
router.get("/new", (req, res) => {
  res.render("form");
});

module.exports = router;
