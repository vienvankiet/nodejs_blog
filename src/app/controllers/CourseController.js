const Course = require("../models/Course");
const {mongooseToObject} = require('../../until/mongoose')
class CourseController {

  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({slug : req.params.slug})
      .then((courses) =>{
        res.render('courses/show',{
          courses: mongooseToObject(courses)
        });
      })
      .catch((next));
    ;
  }
}
module.exports = new CourseController();
