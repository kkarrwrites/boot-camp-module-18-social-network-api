const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

// TODO: POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// TODO: PUT to update a thought by its _id
// TODO: DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
// TODO: POST to create a reaction stored in a single thought's reactions array field
// TODO: DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;
