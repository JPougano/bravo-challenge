const express = require("express");
const mongoose = require("mongoose");
const assert = require("assert");
const morgan = require("morgan");
const router = require("./routes");
const { SERVER_PORT, DB_CONNECTION_URI } = process.env;

const app = express();
const PORT = SERVER_PORT || 5001;

assert.ok(
  DB_CONNECTION_URI,
  "DB_CONNECTION_URI must be provided before using this application"
);

(async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URI);
    console.log("Successfully connected to mongoDb");

    startServer();
  } catch (error) {
    console.error("Error setting up server:", error);
    process.exit(1);
  }
})();

const startServer = () => {
  app.use("/", morgan("dev"));
  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
  });
};
