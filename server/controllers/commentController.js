const baseController = require("./baseController");

const CommentModel = require("../models/CommentModel");

const commentController = baseController(CommentModel, "Comment");

module.exports = commentController;
