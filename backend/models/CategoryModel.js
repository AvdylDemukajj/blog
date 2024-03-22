const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,
    updatedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
