const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./init/mongodb");
const { authRoute, categoryRoute } = require("./routes");
const { errorHandler } = require("./middlewares");
const { notFound } = require("./controller");

//init app
const app = express();
dotenv.config();

//connect database
connectDb();

//third-party middleware
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

//route section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("*", notFound);

//middleware
app.use(errorHandler);

module.exports = app;
