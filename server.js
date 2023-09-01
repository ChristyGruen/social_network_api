const express = require('express');
const db = require('./config/connection');
const { Reaction, Thought, User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///need to update per README
//get all users, thoughts  ref mod18 lesson12 server.js


app.get("/api/user", async(req,res) => {
  try{
  const result = await User.find({});
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

app.get("/api/thought", async(req,res) => {
  try{
  const result = await Thought.find({});
  res.status(200).json(result)
}catch(err){
  console.log(err)
}
});

//get one user, thought
app.get("/user/:id", async(req,res) => {
  const result = await User.findById(req.params.id)
  res.status(200).json(result)
});

app.get("/thought/:id", async(req,res) => {
  const result = await Thought.findById(req.params.id)
  res.status(200).json(result)
});





// app.post("/car", async (req, res) => {
//   const newCar = await Car.create(req.body)
//   res.status(200).json({ result: newCar })
// })

// app.post("/driver", async (req, res) => {
//   const newDriver = await Driver.create(req.body)
//   res.status(200).json({ result: newDriver })
// })

// app.put("/car/:id", async(req, res) => {
//   const update = await Car.findOneAndUpdate(
//     { _id: req.params.id },
//     { make: JSON.stringify(req.body.make) },
//     { model: JSON.stringify(req.body.model) },
//     { year: JSON.stringify(req.body.year) },
//     { new: true }
//   )
//   res.status(200).json({ result: update })
// })

// app.put("/car/:id", async(req, res) => {
//   const updateCar = await Car.findOneAndUpdate(
//     { _id: req.params.id },
//     { make: (req.body.make), 
//       model: (req.body.model),
//       year: (req.body.year),
//       drivers: (req.body.drivers[0])
//     },
//     { new: true }
//   )
//   res.status(200).json({ result: updateCar })
// })


// app.get("/driver/:id", async(req,res) => {
//   const driver = await Driver.findById(req.params.id).populate("driver")
//   res.status(200).json({ result: driver })
// })



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
