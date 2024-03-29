const { Thought, User } = require('../models');

module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
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
        console.log(err);
        res.status(500).json(err);
      });
  },
  // POST to create a new thought and push the created thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          // Filter
          { _id: req.body.userId },
          // Update
          // $push operator appends a specified value to an array
          { $push: { thoughts: thought._id } },
          // { new: true } returns the document after update was applied because by default findOneAndUpdate() returns the document as it was before update was applied
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      // Filter
      { _id: req.params.thoughtId },
      // Update
      // $set operator replaces the value of a field with the specified value
      { $set: req.body },
      // { runValidators: true } makes sure that the data added to the database fits the parameters of the database
      // { new: true } returns the document after update was applied because by default findOneAndUpdate() returns the document as it was before update was applied
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted, but no user with this ID found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      // Filter
      { _id: req.params.thoughtId },
      // Update
      // $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array
      { $addToSet: { reactions: req.body } },
      // { runValidators: true } makes sure that the data added to the database fits the parameters of the database
      // { new: true } returns the document after update was applied because by default findOneAndUpdate() returns the document as it was before update was applied
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(400).json({ message: 'No thought with that ID' })
          : res.json(reaction)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      // Filter
      { _id: req.params.thoughtId },
      // Update
      // $pull operator removes from an existing array all instances of a value or values that match a specified condition
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      // { runValidators: true } makes sure that the data added to the database fits the parameters of the database
      // { new: true } returns the document after update was applied because by default findOneAndUpdate() returns the document as it was before update was applied
      { runValidators: true, new: true }
    )
      .then((reaction) => {
        !reaction
          ? res.status(400).json({ message: 'No thought with that ID' })
          : res.json(reaction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
