const express = require("express");
const indexRouter = require("./routes/index");
const app = express();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}.`);
});
