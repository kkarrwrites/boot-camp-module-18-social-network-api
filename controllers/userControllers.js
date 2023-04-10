const { User } = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
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
      // { runValidators: true } makes sure that the data added to the database fits the parameters of the database
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
  // POST to add a new friend to a user's friend list
  createFriend(req, res) {
    User.findOneAndUpdate(
      // Filter
      { _id: req.params.userId },
      // Update
      // $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array
      { $addToSet: { friends: req.params.friendId } },
      // { runValidators: true } makes sure that the data added to the database fits the parameters of the database
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
  // DELETE to remove a friend from a user's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      // Filter
      { _id: req.params.userId },
      // Update
      // $pull operator removes from an existing array all instances of a value or values that match a specified condition
      { $pull: { friends: req.params.friendId } },
      // { runValidators: true } makes sure that the data added to the database fits the parameters of the database
      // { new: true } returns the document after update was applied because by default findOneAndUpdate() returns the document as it was before update was applied
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(400).json({ message: 'No user with that ID' })
          : res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
