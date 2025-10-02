const Course = require('../models/Course');
const { mongooseToObject, mutipleMongooseToObject } = require('../../until/mongoose');
class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(courses => {
        res.render('courses/show', {
          courses: mongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    // res.json(req.body);
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect(`/me/stored/courses`))
      .catch(error => {});
  }
  // [GET] /courses/:/id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course =>
        res.render('courses/edit', {
          course: mongooseToObject(course),
        }),
      )
      .catch(next);
  }
  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
  // [Delete] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [Delete] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        return Course.updateOne({ _id: req.params.id }, { deleted: false });
      })
      .then(() => res.redirect('/me/trash/courses'))
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      //Delete
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('/me/stored/courses'))
          .catch(next);
        break;

      //Retore
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => {
            return Course.updateOne({ _id: { $in: req.body.courseIds } }, { deleted: false });
          })
          .then(() => res.redirect('/me/trash/courses'))
          .catch(next);
        break;

      //Force
      case 'force':
        Course.deleteOne({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('/me/trash/courses'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action invalid!' });
    }
  }
}
module.exports = new CourseController();
