const router = require("express").Router();

const { getAllThought, getThoughtById, createThought, deleteThought, updateThought, createReaction, deleteReaction, 
} = require("../..controllers/thoughtController");

router.route("/").get(getAllThought).post(createThought);

router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.export = router;
