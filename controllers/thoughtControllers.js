const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

// /api/thoughts
module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

// TODO: POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// TODO: PUT to update a thought by its _id
// TODO: DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
// TODO: POST to create a reaction stored in a single thought's reactions array field
// TODO: DELETE to pull and remove a reaction by the reaction's reactionId value
