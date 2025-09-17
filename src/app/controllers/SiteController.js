const Course = require("../models/Course");
const {mutipleMongooseToObject} = require('../../until/mongoose')
class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) =>{
        res.render('home',{
          courses: mutipleMongooseToObject(courses)
        });
      })
      .catch((next));
    ;
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }

  // [GET] /news
  news(req, res) {
    res.render("news");
  }
}

module.exports = new SiteController();
