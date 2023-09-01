const express = require('express');
const db = require('./config/connection');
const { Reaction, Thought, User } = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///need to update per README
//get all users, thoughts  ref mod18 lesson12 server.js

// moved these into their own api js files

// app.get("/api/user", async(req,res) => {
//   try{
//   const result = await User.find({});
//   res.status(200).json(result)
// }catch(err){
//   console.log(err)
// }
// });

// app.get("/api/thought", async(req,res) => {
//   try{
//   const result = await Thought.find({});
//   res.status(200).json(result)
// }catch(err){
//   console.log(err)
// }
// });

// //get one user, thought
// app.get("/api/user/:id", async(req,res) => {
//   const result = await User.findById(req.params.id)
//   res.status(200).json(result)
// });

// app.get("/api/thought/:id", async(req,res) => {
//   const result = await Thought.findById(req.params.id)
//   res.status(200).json(result)
// });

// app.post("/api/user", async (req,res) =>{
//   const newUser = await User.create(req.body)
//   res.status(200).json({result: newUser})
// });

// app.post("/api/thought", async (req,res) =>{
//   const newThought = await Thought.create(req.body)
//   res.status(200).json({result: newThought})
// });

// app.put("api/user/:id", async(req, res) => {
//   const update = await User.findOneAndUpdate(
//     { _id: req.params.id },
//     { username: JSON.stringify(req.body.username) },
//     { email: JSON.stringify(req.body.email) },
//     { new: true }
//   )
//   res.status(200).json({ result: update })
// })

// app.put("api/thought/:id", async(req, res) => {
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




db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
