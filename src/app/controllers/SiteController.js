const Course = require("../models/Course");
class SiteController {
  // [GET] /
  index(req, res) {
    Course.find({})
      .then((courses) => res.json(courses))
      .catch((err) => res.status(400).json({ error: "Error!!!" }));

    // res.render('home');
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
