const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const corsOptions = require('./config/corsOptions')
const app = express();
const port = process.env.PORT || 5000;

// Middleware
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(express.json());
app.use(requestLogger);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB", err));

// Routes
const availibilityRoutes = require("./routes/availibilityRoutes");
const specializationRouter = require("./routes/specializationRouter");

app.use("/api", availibilityRoutes);
app.use("/api", specializationRouter);

app.use(errorLogger);

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
