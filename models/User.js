const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },

    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// Initialize User model
const User = model("user", userSchema);

module.exports = User;