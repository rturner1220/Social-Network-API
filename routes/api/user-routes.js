const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updatedUser,
    deleteUser,
    addNewFriend,
    deleteNewFriend,
} = require('../../controllers/user-controller');

//  getting all users & creating a user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/users/:userId
router
    .route('/:id')
    .get(getSingleUser)
    .put(updatedUser)
    .delete(deleteUser);

// Add & Delete new friend : /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendID')
    .route(addNewFriend)
    .route(deleteNewFriend);

module.exports = router;



