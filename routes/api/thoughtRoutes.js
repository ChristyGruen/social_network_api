const router = require('express').Router();
const { Thought, User } = require('../../models')

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

//delete thought by id  UPDATE TO MIMIC DELETE STUDENT in courseController Mod18 Lession28
//only Thought deleted
// router.delete("/:thoughtId", async(req, res) => {
//   try{
//   const update = await Thought.findOneAndDelete(
//     { _id: req.params.thoughtId }
//   )
//   res.status(200).json({ result: update })
// }catch(err){
//   console.log(err)
// }
// });


//Delete a thought and remove it from the list for the User 
//Thought deleted from Thought and from User

router.delete ("/:thoughtId", async (req, res) => {
  try {
    const update = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!update) {
      res.status(404).json({ message: 'No thought with that ID' });
    }

    await User.deleteMany({ _id: { $in: update.user } });
    res.json({ message: 'Thought deleted from Thought and User' });
  } catch (err) {
    res.status(500).json(err);
  }
}),

/////////////////// reactions post and delete

// Add a reaction to a thought
router.post("/:thoughtId/reaction", async (req,res) =>{
  console.log(req.body);

  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Remove reaction from a thought
router.delete("/:thoughtId/reaction/:reactionId", async(req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});







module.exports = router;

/*

Mod18 Lesson28 courseRoutes.js

reaction add and delete routes ref
Mod18 Lesson28 studentController.js and studentRoutes.js





*/