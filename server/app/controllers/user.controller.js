const db = require("../models");

const Lecture = db.lecture;
const Course = db.course;
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.addCourse = (req, res) => {
  
  const course = new Course({
    name: req.body.name,
    level: req.body.level,
    description: req.body.description,
    imageURL: req.body.imageURL
  });

  course.save((err, course) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ course });
      return;
    }
  })
};

exports.addLecture = (req, res) => {
  
  
  Lecture.findOne({
    instructorId:req.body.instructorId,
    scheduledOn:req.body.scheduledOn
  }).exec((err, lectures) => {

    if (lectures) {
      res.status(400).send({message:"instructor not available on given date"});
      return;
    }
    
    const lecture = new Lecture({
      course:req.body.courseId,
      instructorId:req.body.instructorId,
      scheduledOn:req.body.scheduledOn
    })

    lecture.save((err, lecture) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send({ lecture });
        return;
      }
    })
    });
};


exports.getInstructors = (req, res) => {
  
  Role.findOne({
    name:"instructor"
  }).exec((err, role) => {
    
      if (err) {
        res.status(500).send({ message: "Unknown error" });
        return;
        
      }else{
        const query = User.find({
          roles:[role.id]
        }).select({  "password": 0});
        query.exec((err, users) => {
          
          if (err) {
            res.status(500).send({ message: "Unknown error" });
            return;
            
          }else{
            res.status(200).send(users);
            return;  
          }
        });   
      }
    
    });



};

exports.instructorLectures = (req, res) => {
  
  Lecture.find({
    instructorId:req.userId
  }).populate("course").exec((err, lectures) => {
    
    if (lectures) {
      res.status(200).send(lectures);
      return;
    }
    res.status(500).send({ message: "Unknown error" });
      return;
    });
};
