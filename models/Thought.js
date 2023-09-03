const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {

    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      }
    },

    username: {
      type: String,
      required: true
    },

    reactions: [reactionSchema],

  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true }
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () { return (this.reactions.length) ? this.reactions.length : 0 })

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;

/*
REFERENCE
thoughtText min max length
https://stackoverflow.com/questions/28829912/mongoose-schema-set-max-length-for-a-string

createdAt format
https://stackoverflow.com/questions/70724966/how-to-use-getter-or-setter-with-mongoose-timestamps

reactions
reference: mod18lesson28 Student.js

reactionCount 
https://stackoverflow.com/questions/33447670/mongoose-get-length-of-array-in-model

https://stackoverflow.com/questions/51656553/nodejs-express-mongoose-trying-to-get-length-of-list-as-a-vi

virtuals to count reactions  https://mongoosejs.com/docs/guide.html




*/