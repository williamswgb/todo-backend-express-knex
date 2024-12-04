const express = require("express");
const organisationController = require("../controllers/organisationController");

const router = express.Router();

router.post("/", organisationController.create); // POST /organisations

router.get("/", organisationController.list); // GET /organisations
router.get("/:id", organisationController.find); // GET /organisations/:id

router.put("/:id", organisationController.update); // PUT /organisations/:id

router.delete("/:id", organisationController.delete); // DELETE /organisations/:id

router.post("/:id/add-user", organisationController.addUser); // POST /organisations/:id/add-user
router.post("/:id/remove-user", organisationController.removeUser); // POST /organisations/:id/remove-user

module.exports = router;
