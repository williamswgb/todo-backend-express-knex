const knex = require("../database/connection");
const baseModel = require("./baseModel");
const baseUserEntityModel = require("./baseUserEntityModel");

const organisationModel = {
  ...baseModel("organisations", knex),
  ...baseUserEntityModel("organisations_users", knex),
};

module.exports = organisationModel;
