const router = require('express').Router();
const { User } = require('../../models')

//get all users
router.get("/", async(req,res) => {
  try{
  const result = await User.find({});
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

//get one user
router.get("/:id", async(req,res) => {
  console.log(req.body)
  console.log(req.params.id)
  console.log(req.params)
  try{
  const result = await User.findById(req.params.id)
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

// post new user
router.post("/", async (req,res) =>{
  try{
  const newUser = await User.create(req.body)
  res.status(200).json({result: newUser})
}catch(err){
  console.log(err)
}
});

//update user by id
router.put("/:id", async(req, res) => {
  console.log(req.body)
  try{
  const update = await User.findOneAndUpdate(
    { _id: req.params.id },
    { username: req.body.username ,//removed JSON.stringify(req.body.username)
     email: req.body.email },//removed JSON.stringify(req.body.email)
    {new: true }
  )
  res.status(200).json({ result: update })
}catch(err){
  console.log(err)
}
});

//delete user by id //Austin said this should also have something to do with thoughts???  should the thoughts written by that user be deleted too?  Or should they stay because someone else may have reacted to it?
router.delete("/:id", async(req, res) => {
  try{
  const update = await User.findOneAndDelete({ _id: req.params.id })
  res.status(200).json({ result: update })
}catch(err){
  console.log(err)
}
});






module.exports = router;


//Mod18 Lesson28 studentRoutes.js
