const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.create); // POST /users

router.get("/", userController.list); // GET /users
router.get("/:id", userController.find); // GET /users/:id

router.put("/:id", userController.update); // PUT /users/:id

router.delete("/:id", userController.delete); // DELETE /users/:id

module.exports = router;
