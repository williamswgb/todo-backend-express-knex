const knex = require("../database/connection");
const baseModel = require("./baseModel");
const baseUserEntityModel = require("./baseUserEntityModel");

const projectModel = {
  ...baseModel("projects", knex),
  ...baseUserEntityModel("projects_users", knex),
};

module.exports = projectModel;
