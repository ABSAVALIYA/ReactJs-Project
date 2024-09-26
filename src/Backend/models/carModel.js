const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  name: String,
  price: Number,
  year: Number,
  image: String,
});

module.exports = mongoose.model("cardetails", carSchema);
