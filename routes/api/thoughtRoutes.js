const router = require('express').Router();
const { Thought, User } = require('../../models/index')

//get all thoughts
router.get("/", async (req, res) => {
  try {
    const result = await Thought.find({});
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
  }

});

//get one thought
router.get("/:id", async (req, res) => {
  try {
    const result = await Thought.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
  }
});

// post new thought
router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body)
    console.log(newThought)
    console.log(`this is newthought username ${newThought.username}`)
    console.log(newThought._id)
    console.log(newThought.id)
    const addThought = await User.findOneAndUpdate(
      { username: newThought.username },
      { $addToSet: { thoughts: newThought.id } },
      { runValidators: true, new: true }
    );

    if (!addThought) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.status(200).json({ result: newThought })
  } catch (err) {
    console.log(err)
  }
});

//update thought by id
router.put("/:id", async (req, res) => {
  const update = await Thought.findOneAndUpdate(
    { _id: req.params.id },
    {
      thoughtText: req.body.thoughtText,
      username: req.body.username
    },
    { new: true }
  )
  res.status(200).json({ result: update })
});

//Delete a thought and remove it from the list for the User 
router.delete("/:thoughtId", async (req, res) => {
  try {
    const update = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

    if (!update) {
      res.status(404).json({ message: 'No thought with that ID' });
    }
    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Thought deleted, but no user found',
      });
    }
    res.json({ message: 'Thought deleted from Thought and User' });
  } catch (err) {
    res.status(500).json(err);
  }
}),

  /////////////////// reactions post and delete

  // Add a reaction to a thought
  router.post("/:thoughtId/reaction", async (req, res) => {
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
router.delete("/:thoughtId/reaction/:reactionId", async (req, res) => {
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
REFERENCES
Mod18 Lesson28 courseRoutes.js

reaction add and delete routes ref
Mod18 Lesson28 studentController.js and studentRoutes.js


*/