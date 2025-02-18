const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/courses/?id=${course.id}`
      });
      res.json(course);
    })
    .catch(err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id)
      .then(course => {
        if (course) {
          res.json(course);
        }
        res.status(404);
        res.json({ error: "Course doesnt exist" })
      })
      .catch((err) => {
        res.status(500);
        console.log('error while queryting the course', err)
        res.json({ error: "There was an error" })
      });
  } else {
    // get all teachers
    Course.find()
      .then(course => {
        res.json(course);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

const coursePut = (req, res) => {
  if(req.query && req.query.id){
    Course.findById(req.query.id)
    .then(course => {
      if(course){
        course.name = req.body.name || course.name;
        course.code = req.body.code || course.code;
        course.description = req.body.description || course.description;
        course.credits = req.body.credits || course.credits;
        course.teacher = req.body.teacher || course.teacher;
      
        course.save()
        .then(() => {
          res.json(course);
        })
        .catch ((err) => {
          res.status(422);
          console.log ('error while updating the course', err);
          res.json({
            error: 'There was an error updating the course'
          });
        });
      } else {
        res.status(404);
        res.json({ error: 'Teacher doesn\'t exist'});
      }
    })
    .catch((err) => {
      res.status(500);
      console.log('error while querying the teacher', err);
      res.json({ error: 'There was an error' });
    });
  } else {
    res.status(422);
    res.json({error: 'There was an error' });
  }
};

const courseDelete = (req, res) => {
  if (req.query && req.query.id) {
    Course.findByIdAndDelete(req.query.id)
      .then(course => {
        if (course) {
          res.json({ message: 'Teacher successfully deleted' });
        } else {
          res.status(404);
          res.json({ error: 'Teacher doesn\'t exist' });
        }
      })
      .catch((err) => {
        res.status(500);
        console.log('error while querying the teacher', err);
        res.json({ error: 'There was an error' });
      });
  } else {
    res.status(422);
    res.json({ error: 'No valid ID provided for teacher' });
  }
};

module.exports = {
  coursePost,
  courseGet,
  coursePut,
  courseDelete
}