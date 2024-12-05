const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/", commentController.create); // POST /comments

router.get("/", commentController.list); // GET /comments
router.get("/:id", commentController.find); // GET /comments/:id

router.put("/:id", commentController.update); // PUT /comments/:id

router.delete("/:id", commentController.delete); // DELETE /comments/:id

module.exports = router;
