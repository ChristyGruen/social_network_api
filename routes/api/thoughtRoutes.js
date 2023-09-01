const router = require('express').Router();
//not using controllers
// const {
//   getCourses,
//   getSingleCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
// } = require('../../controllers/courseController.js');

// // /api/courses
// router.route('/').get(getCourses).post(createCourse);

// // /api/courses/:courseId
// router
//   .route('/:courseId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

//get all thoughts
app.get("/thought", async(req,res) => {
  try{
  const result = await Thought.find({});
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

//get one thought
app.get("/thought/:id", async(req,res) => {
  const result = await Thought.findById(req.params.id)
  res.status(200).json(result)
});

// post new thought
app.post("/thought", async (req,res) =>{
  const newThought = await Thought.create(req.body)
  res.status(200).json({result: newThought})
});

//update thought by id
app.put("/thought/:id", async(req, res) => {
  const update = await Thought.findOneAndUpdate(
    { _id: req.params.id },
    { thoughtText: JSON.stringify(req.body.thoughtText) },
    { username: JSON.stringify(req.body.username) },
    { new: true }
  )
  res.status(200).json({ result: update })
});

//delete thought by id
app.delete("/thought/:id", async(req, res) => {
  const update = await Thought.findOneAndDelete(
    { _id: req.params.id }
  )
  res.status(200).json({ result: update })
});

// to do things with reactions, do you loop through the array in Thought? 










module.exports = router;

//Mod18 Lesson28 courseRoutes.js