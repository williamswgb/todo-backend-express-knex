const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", taskController.create); // POST /tasks

router.get("/", taskController.list); // GET /tasks
router.get("/:id", taskController.find); // GET /tasks/:id

router.put("/:id", taskController.update); // PUT /tasks/:id

router.delete("/:id", taskController.delete); // DELETE /tasks/:id

router.post("/:id/assign", taskController.addUser); // POST /tasks/:id/assign
router.post("/:id/unassign", taskController.removeUser); // POST /tasks/:id/unassign

module.exports = router;
