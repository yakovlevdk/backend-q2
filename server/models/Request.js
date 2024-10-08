const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
