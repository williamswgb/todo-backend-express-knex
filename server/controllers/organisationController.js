const OrganisationModel = require("../models/OrganisationModel");
const baseController = require("./baseController");

const organisationController = baseController(
  "Organisation",
  OrganisationModel
);

module.exports = organisationController;
