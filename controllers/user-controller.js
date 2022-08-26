const { User, Thought } = require('../models');

const userController = {
    //  get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id, populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thought')
            .populate('friends')
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).jason({ message: 'No user ID exits.' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update a user by its _id
    updatedUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user by its _id and their thoughts
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id' });
                }
                // Remove a user's associated thoughts when deleted.
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.jason({ message: 'user associated thoughts deleted' })
            })
            .catch(err => re.status(400).json(err));
    },

    // add a new friend to a user's friend list /api/users/:userId/friends/:friendId
    addNewFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendID } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user find with this id!' });
                    return;
                }
                re.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete a friend from a user's friend list
    deleteNewFriend({ params }, res) {
        User.findOneAndDelete(
            { _id: params.userId },
            { $pull: { comments: params.friendID } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user find it by this id' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err)
            );
    }
};

module.exports = userController;