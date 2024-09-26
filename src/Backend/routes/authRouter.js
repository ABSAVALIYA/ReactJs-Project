const express = require("express");
const {
  registerUser,
  carDetails,
  insertCardetails,
  carDelete,
  showUser,
  editCardetails,
  fetchCardetails,
} = require("../helpers/authHelper");

const router = express.Router();

//registerUser
router.post("/register", registerUser);
router.get("/carddetails", carDetails);
router.post("/insertCar", insertCardetails);
router.delete("/deleteCar/:id", carDelete);
router.get("/showuser", showUser);
router.put("/editCardetails/:id", editCardetails);
router.get("/fetchCardetails/:id", fetchCardetails);
module.exports = router;
