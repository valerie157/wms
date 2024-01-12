const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middleWare/errorMiddleware");
// Import routes
const userRoute = require("./routes/userRoutes");

const app = express();

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up CORS middleware
app.use(cors());

// Routes middleware
app.use("/api/users", userRoute);

// Routes
app.post("/", (req, res) => {
  res.send("Live Page");
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error middleware (should be placed after all route handling middleware)
// app.use(errorHandler)
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
