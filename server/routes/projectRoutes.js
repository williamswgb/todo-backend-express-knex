const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.post("/", projectController.create); // POST /projects

router.get("/", projectController.list); // GET /projects
router.get("/:id", projectController.find); // GET /projects/:id

router.put("/:id", projectController.update); // PUT /projects/:id

router.delete("/:id", projectController.delete); // DELETE /projects/:id

router.post("/:id/add-user", projectController.addUser); // POST /projects/:id/add-user
router.post("/:id/remove-user", projectController.removeUser); // POST /projects/:id/remove-user

module.exports = router;
