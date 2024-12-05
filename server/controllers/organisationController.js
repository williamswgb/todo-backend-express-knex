const baseController = require("./baseController");
const baseUserEntityController = require("./baseUserEntityController");

const OrganisationModel = require("../models/organisationModel");

const organisationController = {
  ...baseController(OrganisationModel, "Organisation"),
  ...baseUserEntityController(OrganisationModel, "Organisation"),
};

module.exports = organisationController;
