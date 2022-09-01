const { Thought, User } = require('../models');

const thoughtController = {

    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .sort({ createAt: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // to get a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought find it with this ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new thought (thought's _id to the associated user's thoughts array field)
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findByIdAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },


    // PUT to update a thought by id
    updateThought(req, res) {
        Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },


    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: paramas.id })
            .then(deleteThought => {
                if (!deleteThought) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err =>
                res.json(err)
            );
    },

    // create a reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is NO thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err =>
                res.json(err)
            );
    },

    // pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch(err =>
                res.json(err)
            );
    }


};

module.exports = thoughtController;








