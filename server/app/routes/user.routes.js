const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);

  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

  //admin routes
  app.use("/api/admin/*",
    [authJwt.verifyToken, authJwt.isAdmin]
  );

  app.get("/api/admin",controller.adminBoard);
  
  app.post("/api/admin/course",controller.addCourse);
  
  app.post("/api/admin/lecture",controller.addLecture);

  app.get("/api/admin/instructors",controller.getInstructors);


  //instructor routes
  app.use(
    "/api/instructor/*",
    [authJwt.verifyToken, authJwt.isModerator]
  );

  app.get("/api/instructor/lectures", controller.instructorLectures);

};
