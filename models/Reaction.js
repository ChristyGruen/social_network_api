const { Schema } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    username: {
      type: String,
      required: true},

    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
    }},
  },
  {timestamps: true,
    // toObject: {virtuals: true}, 
    toJSON: {getters: true, virtuals:true}}
);


module.exports = reactionSchema;
