const router = require('express').Router();
// not using controllers
// const {
//   getStudents,
//   getSingleStudent,
//   createStudent,
//   deleteStudent,
//   addAssignment,
//   removeAssignment,
// } = require('../../controllers/studentController');

// // /api/students
// router.route('/').get(getStudents).post(createStudent);

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

//get all users
app.get("/user", async(req,res) => {
  try{
  const result = await User.find({});
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

//get one user
app.get("/user/:id", async(req,res) => {
  const result = await User.findById(req.params.id)
  res.status(200).json(result)
});

// post new user
app.post("/user", async (req,res) =>{
  const newUser = await User.create(req.body)
  res.status(200).json({result: newUser})
});

//update user by id
app.put("/user/:id", async(req, res) => {
  const update = await User.findOneAndUpdate(
    { _id: req.params.id },
    { username: JSON.stringify(req.body.username) },
    { email: JSON.stringify(req.body.email) },
    { new: true }
  )
  res.status(200).json({ result: update })
});

//delete user by id
app.delete("/user/:id", async(req, res) => {
  const update = await User.findOneAndDelete(
    { _id: req.params.id }
  )
  res.status(200).json({ result: update })
});






module.exports = router;


//Mod18 Lesson28 studentRoutes.js
