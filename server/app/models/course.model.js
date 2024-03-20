const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    level: String,
    description: String,
    imageURL:String
  })
);

module.exports = Course;
