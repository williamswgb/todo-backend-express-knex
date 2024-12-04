const baseController = require("./baseController");
const baseUserEntityController = require("./baseUserEntityController");

const OrganisationModel = require("../models/OrganisationModel");

const organisationController = {
  ...baseController("Organisation", OrganisationModel),
  ...baseUserEntityController("Organisation", OrganisationModel),
};

module.exports = organisationController;
