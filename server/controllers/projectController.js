const baseController = require("./baseController");
const baseUserEntityController = require("./baseUserEntityController");

const ProjectModel = require("../models/projectModel");

const projectController = {
  ...baseController(ProjectModel, "Project"),
  ...baseUserEntityController(ProjectModel, "Project"),
};

module.exports = projectController;
