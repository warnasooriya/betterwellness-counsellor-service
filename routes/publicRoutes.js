const express = require("express");
const Specialization = require("../models/Specialization");
const router = express.Router();

router.get("/getAllSpecialization", async (req, res) => {
    try {
      const specialization = await Specialization.find();
      res.status(200).json(specialization);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
