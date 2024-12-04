const baseController = require("./baseController");
const baseUserEntityController = require("./baseUserEntityController");

const ProjectModel = require("../models/ProjectModel");
const OrganisationModel = require("../models/OrganisationModel");

const projectController = {
  ...baseController("Project", ProjectModel),
  ...baseUserEntityController("Project", ProjectModel),
};

module.exports = projectController;
