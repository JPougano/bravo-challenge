const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const { SERVER_PORT } = process.env;

const PORT = SERVER_PORT || 5001;

const app = express();

app.use("/", morgan("dev"));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
