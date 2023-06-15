// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const dotenv = require("dotenv");
dotenv.config();
// eslint-disable-next-line no-undef
const cors = require("cors");
const helmet = require("helmet"); // Helmet helps secure Express apps by setting HTTP response headers.
// eslint-disable-next-line no-undef
const morgan = require("morgan"); // HTTP request logger middleware for node.js

// eslint-disable-next-line no-undef
require("./src/db/connection");

// eslint-disable-next-line no-undef
const userRouter = require("./src/routes/users");
// eslint-disable-next-line no-undef
const authRouter = require("./src/routes/auth");
const app = express();

//to use dotenv package
dotenv.config();

//middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`listening to port : ${port}`);
});
