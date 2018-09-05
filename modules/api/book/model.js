const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookModel = new Schema(
  {
    title: { type: String, required: true, unique: true},
    author: { type: String, required: true},
    rating: { type: String },
    category: { type: String},
    numberOfPage: { type: Number, required: true},
    publisher: { type: String, required: true},
    retailCompany: { type: String },
    priceOfBook: { type: String, require: true},
    description: {
      title: { type: String },
      content: { type: String},
      contentForReading: {type: String}
    },
  },
  {
    timestamps: { createdAt: 'createdAt'}
  }
)

module.exports = mongoose.model('books', bookModel)
