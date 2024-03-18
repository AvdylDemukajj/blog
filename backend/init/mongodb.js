const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DATABASE;

//connect database
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
