const mongoose = require("mongoose");

// Paste your own MongoDB Atlas connection string here
const MONGO_URI = "mongodb://127.0.0.1:27017/blog";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });