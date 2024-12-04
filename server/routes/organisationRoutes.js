const express = require("express");
const {
  createOrganisation,
  getOrganisation,
  listOrganisations,
  updateOrganisation,
  deleteOrganisation,
} = require("../controllers/organisationController");

const router = express.Router();

router.post("/", createOrganisation); // POST /organisations

router.get("/", listOrganisations); // GET /organisations
router.get("/:id", getOrganisation); // GET /organisations/:id

router.put("/:id", updateOrganisation); // PUT /organisations/:id

router.delete("/:id", deleteOrganisation); // DELETE /organisations/:id

module.exports = router;
