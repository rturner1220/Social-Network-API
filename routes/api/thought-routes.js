const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// getting all Thoughts & creating thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createNewThought)

// set up GET one, PUT, and DELETE at /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .post(createReaction)
    .put(updateThought)
    .delete(deleteThought)

//  Delete new reaction : /api/thoughts/:thoughtId/reactions/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
