const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  carmodel: {
    type: String,
    required: true,
    trim: true,
  },
  customername: {
    type: String,
    required: true,
    trim: true,
  },
  startdate: {
    type: Date,
    required: true,
    trim: true,
  },
  enddate: {
    type: Date,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("user", userSchema);
