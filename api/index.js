if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.listen(process.env.API_PORT, () =>
  console.log("Listening on port " + process.env.API_PORT)
);
