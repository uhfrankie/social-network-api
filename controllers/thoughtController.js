const {User, Thought} = require("../models");

const thoughtContoller = {
    getAllThought( req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .populate({
                path:"reactions",
                select: "-__v"
            }) .select("-__v")
            .sort({_id: -1})
            .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thoughts found!"})
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts:_id}},
                {new: true}
            );
        })
        .then(dbThoughtData => {
            if (dbThoughtData) {
                res.status(404).json({message:"No user found"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.jason(err));
    },

    updateThought ({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(dbThoughtData) {
                res.status(404).json({message:"No thoughts found"});
                return;
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.Id}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if(dbUserData) {
                res.status(404).json({message:"no user found"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .populate({
            path: "reactions",
            select: "-__v" })
            .select("-__v")
            .then(dbThoughtData => {
                if(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(dbThoughtData) {
                res.status(404).json({message:"No"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtContoller;