const { Schema, model } = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new Schema(
  {

    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, 'invalid email']
    },
    thoughts: [{
      ref: 'Thought',
      type: Schema.Types.ObjectId
    }],
    friends: [{
      ref: 'User',
      type: Schema.Types.ObjectId
    }],
  },  {timestamps: true,
    // toObject: {virtuals: true}, 
    toJSON: {getters: true, virtuals:true}}
);

userSchema.virtual('friendCount')
    .get(function() {return (this.friends.length) ? this.friends.length : 0})

const User = model('User', userSchema);
module.exports = User;



/*
username unique trim
https://masteringjs.io/tutorials/mongoose/unique
https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose

validate email
https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
https://github.com/validatorjs/validator.js
npm installed validator


*/