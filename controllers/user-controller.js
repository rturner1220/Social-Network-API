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
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: '-__v'
                },

            ])
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User with this ID does not exist.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // update a user by its _id
    updatedUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true })
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
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
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
            .catch(err => res.status(400).json(err));
    },

    // add a new friend to a user's friend list /api/users/:userId/friends/:friendId
    addNewFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: params.friendID } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user find with this id!' });
                }
                re.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete a friend from a user's friend list
    deleteNewFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            { $pull: { friends: params.friendID } },
            { new: true, runValidators: true }
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