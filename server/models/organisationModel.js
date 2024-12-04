const knex = require("../database/connection");
const baseModel = require("./baseModel");

const organisationModel = baseModel("organisations", knex);

module.exports = organisationModel;
