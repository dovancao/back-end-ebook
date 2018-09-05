const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageModel = new Schema(
  {
    image: { type: Buffer, require: true},
    title: { type: String, required: true},
  },
  { timestamps: { createdAt: "createdAt" } }
)

module.exports = mongoose.model("images", imageModel);