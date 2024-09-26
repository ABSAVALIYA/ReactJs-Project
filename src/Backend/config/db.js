const mongoose = require("mongoose");
const connectDB = async () => {
  try {
   const con= await mongoose.connect(
      "mongodb+srv://root:root@cluster0.erplnfi.mongodb.net/Carrent"
    );
    console.log("coonected");
    return con;
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;