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
router.post("/new", (req, res) => {
  let messageText = req.body.messageText;
  let messageUser = req.body.messageUser;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});
module.exports = router;
