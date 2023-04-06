const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// /api/users
module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and TODO: populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
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
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: PUT to update a user by its _id
  // DELETE to remove user by its _id
  // BONUS: Remove a user's associated thoughts when deleted
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.parms.userId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'User created, but no user with this id',
            })
          : res.json({ message: 'User deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
};

// /api/users/:userId/friends/:friendId
// TODO: POST to add a new friend to a user's friend list
// TODO: DELETE to remove a friend from a user's friend list
