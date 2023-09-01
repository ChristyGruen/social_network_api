const router = require('express').Router();
const { Thought } = require('../../models')

//get all thoughts
router.get("/", async(req,res) => {
  try{
  const result = await Thought.find({});
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

//get one thought
router.get("/:id", async(req,res) => {
  try{
  const result = await Thought.findById(req.params.id)
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

// post new thought
router.post("/", async (req,res) =>{
  try{
  const newThought = await Thought.create(req.body)
  res.status(200).json({result: newThought})
}catch(err){
  console.log(err)
}
});

//update thought by id
router.put("/:id", async(req, res) => {
  const update = await Thought.findOneAndUpdate(
    { _id: req.params.id },
    { thoughtText: req.body.thoughtText,   //removed JSON.stringify(req.body.thoughtText)
    username: req.body.username }, //removed JSON.stringify(req.body.username)
    { new: true }
  )
  res.status(200).json({ result: update })
});

//delete thought by id
router.delete("/:id", async(req, res) => {
  const update = await Thought.findOneAndDelete(
    { _id: req.params.id }
  )
  res.status(200).json({ result: update })
});

// to do things with reactions, do you loop through the array in Thought? 
//per Gary and Austin: yes










module.exports = router;

//Mod18 Lesson28 courseRoutes.js