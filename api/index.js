if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
const port = process.env.API_PORT;

mongoose
  .connect(process.env.DEV_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database: " + error);
  });

app.use(
  cors({
    origin: "http://localhost:" + process.env.APP_PORT,
    credentials: true,
  })
);
app.use(mongoSanitize());


app.listen(port, () => console.log("Listening on port " + port));
