const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(400).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      // Filter
      { _id: req.params.userId },
      // Update
      // $set operator replaces the value of a field with the specified value
      { $set: req.body },
      // { run:Validators: true } makes sure that the data added to the database fits the parameters of the database
      // { new: true } returns the document after update was applied because by default findOneAndUpdate() returns the document as it was before update was applied
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // DELETE to remove user by its _id
  // TODO: BONUS Remove a user's associated thoughts when deleted
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(400).json({ message: 'No user with that ID' })
          : res.json({ message: 'User was deleted' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // TODO: POST to add a new friend to a user's friend list
  // TODO: DELETE to remove a friend from a user's friend list
};
