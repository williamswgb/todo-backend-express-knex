const CommentModel = require("../models/commentModel");
const baseController = require("./baseController");

const commentController = baseController(CommentModel, "Comment");

module.exports = commentController;
