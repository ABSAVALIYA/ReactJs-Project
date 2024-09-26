const carModel = require("../models/carModel");
const userModel = require("../models/userModel");
const express = require("express");

const app = express();
app.use(express.json());
const registerUser = async (req, res) => {
  try {
    const { carmodel, customername, startdate, enddate } = req.body;

    const user = await userModel({
      carmodel,
      customername,
      startdate,
      enddate,
    }).save();

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};

const carDetails = async (req, res) => {
  try {
    const user = await carModel.find();
    res.json({ status: 200, user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};
const fetchCardetails = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id);
    res.json({ status: 200, car: car });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};

const showUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json({ status: 200, user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};

const carDelete = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id is inside car delete ", id);
    const user = await carModel.findByIdAndDelete(id);
    res.json({ status: 200, user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};

const insertCardetails = async (req, res) => {
  try {
    const { name, price, year, image } = req.body;
    console.log("data coming from client", name, price, year, image);

    const carmodel = await new carModel({
      name,
      price,
      year,
      image,
    }).save();
    res.status(201).json({
      carmodel,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};

const editCardetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, year, image } = req.body;
    const editCardetails = await carModel.findByIdAndUpdate(
      id,
      { name, price, year, image },
      { new: true }
    );
    if (!editCardetails) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(editCardetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};

module.exports = {
  registerUser,
  carDetails,
  insertCardetails,
  carDelete,
  showUser,
  editCardetails,
  fetchCardetails,
};
