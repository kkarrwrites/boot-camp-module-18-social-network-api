const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: date,
      default: Date.now(),
      // TODO: Use a getter method to format the timestamp on query
    },
    // The user that created this thought
    username: {
      type: String,
      required: true,
    },
    // These are like replies
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// A virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
