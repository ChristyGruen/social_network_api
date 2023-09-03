//this doesn't work yet - manually seed db

		// const mongoose = require('mongoose')
		// const {User,Thought} = require('../models/index')

		// mongoose.connect('mongodb://127.0.0.1:27017/social');


//can grab this array and input all of them at once using insomnia

const seedUser = 
[
	{
	"username":"Donna Worry",
	"email":"dworry@email.com"
}
,
{
	"username":"Bea Happy",
	"email":"bhappy@email.com"
}
,
{
	"username":"PJ Devon",
	"email":"pjdevon@email.com"
}
,
{
	"username":"Berry LaVoid",
	"email":"blavoid@email.com"
}
,
{
	"username":"Jason G",
	"email":"jasong@email.com"
}
]


/*

https://plainenglish.io/blog/seeding-mongodb-database-from-node-the-simplest-way
*/

//CAN't bulk create these or the thought won't be written to the user thought array

const seedThought = [
{
  "thoughtText":"Here's a little song I wrote",
  "username":"Donna Worry"
}
,
{
  "thoughtText":"You might want to sing it note for note",
  "username":"Bea Happy"
}
,
{
  "thoughtText":"Canned Catfood is where it's at",
  "username":"PJ Devon"
}
]

//seed a reaction
const seedReaction = [
{
  "reactionBody":"Fancy Feast for the win!",
  "username":"Berry LaVoid"
}
]


		// User.insertMany(seedUser)
		// 	.then(value => {console.log("User data seeded");})
		// 	.catch(error => { console.log(error);})

		// Thought.insertMany(seedThought)
		// .then(value => {console.log("Thought data seeded");})
		// .catch(error => { console.log(error);})


		// mongoose.connection.close()

const randomness = [
// ///////////////////// end seed data
//create user
{
	"username":"SK Whirl",
	"email":"skwhirl@email.com"
}
,
//update user (update ID in URL)
{
	"username":"SK Whorl",
	"email":"skwhorl@email.com"
}
,
/////// delete user SK Whorl (update ID in URL)

///////////add thought
{
  "thoughtText":"Skydiving is amazing",
  "username":"Jason G"
}
,
//update thought (update ID in URL)
{
  "thoughtText":"Skydiving is amazing and exhilarating",
  "username":"Jason G"
}
,
//delete thought Skydiving (update ID in URL)


// add skydiving thought back and grab ID,  (update ID in URL)
{
  "reactionBody":"Sounds like an adventure!",
  "username":"Donna Worry"
}
]



