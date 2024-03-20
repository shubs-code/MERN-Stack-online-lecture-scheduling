const mongoose = require("mongoose");

const Lecture = mongoose.model(
  "Lecture",
  new mongoose.Schema({
    instructorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      } ,
    scheduledOn: Date,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
  })
);

module.exports = Lecture;
