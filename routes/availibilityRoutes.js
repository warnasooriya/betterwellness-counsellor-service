const express = require("express");
const Availability = require("../models/Availability");
const User = require("../models/User");
const router = express.Router();

// Create a new event
router.post("/availability", async (req, res) => {
  const { title, start, end , user } = req.body;

  if (!title || !start || !end) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if(user === undefined){
    return res.status(400).json({ message: "Missing required fields" });
  }
  
  try {
    const userDetails =await User.findOne({cognito_id: user}).exec();
    if(userDetails === null){
      return res.status(400).json({ message: "User not found" });
    }
    const newEvent = new Availability({ title, start, end, user:userDetails._id });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all events
router.get("/availabilityByUser/:userId", async (req, res) => {
  try {
    const user =await User.findOne({cognito_id: req.params.userId}).exec();
    if(user === null){
      return res.status(400).json({ message: "User not found" });
    }
    const events = await Availability.find({user: user._id}).populate('bookedBy');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single event
router.get("/availability/:id",  async (req, res) => {
    const availabilitys =   await Availability.findById(req.params.id);
    res.json(availabilitys);
});

module.exports = router;
