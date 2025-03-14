const express = require("express");
const Specialization = require("../models/Specialization");
const router = express.Router();
const verifyToken = require('../middleware/cognitoAuth');
// router.use(verifyToken)
 
// Get all events
router.get("/specialization", async (req, res) => {
  try {
    const specialization = await Specialization.find();
    res.status(200).json(specialization);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new event
router.post("/specialization",verifyToken, async (req, res) => {
  const { Area , Description} = req.body;

  if (!Area) {
    return res.status(400).json({ message: "Missing Specialization Area" });
  }

  try {
    const specialization =await Specialization.findOne({Area: Area}).exec();
    if(specialization){
        return res.status(400).json({ message: "Specialization already exists" });
    }
     
    const newspec = new Specialization({ Area,Description });
    await newspec.save();
    res.status(201).json(newspec);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Create bulk
router.post("/specializations", verifyToken,async (req, res) => {
    const specializationsList = req.body;
    
    try {
      for await (const spec of specializationsList) {
        const { Area , Description} = spec;

        if (!Area) {
            return res.status(400).json({ message: "Missing Specialization Area" });
            }
        
        const specialization =await Specialization.findOne({Area: Area}).exec();
        if(specialization){
            return res.status(400).json({ message: "Specialization already exists" });
        }
        
        const newspec = new Specialization({ Area,Description });
        await newspec.save();
        
       
      }
       
        res.status(201).json({ message: "Specializations added successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


 

module.exports = router;
