const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const routes = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send(
    "Jericho Pasco - Backend Design Exercise: : Structuring a Node.js Application"
  );
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
