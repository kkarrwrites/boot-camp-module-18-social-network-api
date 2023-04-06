const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// TODO: PUT to update a user by its _id
// TODO: DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted

// /api/users/:userId/friends/:friendId
// TODO: POST to add a new friend to a user's friend list
// TODO: DELETE to remove a friend from a user's friend list

module.exports = router;
