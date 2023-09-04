const router = require('express').Router();
const { User, Thought } = require('../../models')

//get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
  }
});

//get one user
router.get("/:id", async (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  console.log(req.params)
  try {
    const result = await User.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
  }
});

// post new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(200).json({ result: newUser })
  } catch (err) {
    console.log(err)
  }
});

//update user by id
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const update = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        email: req.body.email
      },
      { new: true }
    )
    res.status(200).json({ result: update })
  } catch (err) {
    console.log(err)
  }
});

//delete user and user's thoughts by id 
router.delete("/:id", async (req, res) => {
  try {
    const update = await User.findOneAndDelete({ _id: req.params.id })

    if (!update) {
      res.status(404).json({ message: 'No user with that ID' });
    }
    await Thought.deleteMany({ username: { $in: update.username } });
    res.json({ message: 'User and thoughts deleted!' });

  } catch (err) {
    console.log(err)
  }
});

//////////////////////////// add friends

// Add a friend to a user  (updated router and updated from passing in friend ID in the req.body to passing it in as req.params to match picture in homework demo)
router.post("/:userId/friend/:friendId", async (req, res) => {
  console.log("----------------");
  console.log(req.params.userId);
  console.log(req.params.friendId);


  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    if (!friend) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a friend from the user friend array 
router.delete("/:userId/friend/:friendId", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

/*
REFERENCES
//Mod18 Lesson28 studentRoutes.js
//Mod18 lesson

https://mongoosejs.com/docs/tutorials/findoneandupdate.html

https://stackoverflow.com/questions/15625633/
nodejs-mongoose-mongodb-pull-from-array-not-working


iterate across friend list
https://stackoverflow.com/questions/37805412/remove-an-element-from-an-array-in-javascript-with-slice-or-spread

Mod20 lesson28 BucketList.js
  // Function to remove bucket list item and update state
  const removeBucketItem = (id) => {
    const updatedBucket = [...bucket].filter((item) => item.id !== id);

    setBucket(updatedBucket);
  };

ref for fixing user route to delete from array
https://stackoverflow.com/questions/56637646/delete-value-from-array-within-findoneandupdate

Used remove reaction from a thought (works) to rewrite router.delete for remove friend from a user 
*/