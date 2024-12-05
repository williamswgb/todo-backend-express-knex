const knex = require("../database/connection");
const baseModel = require("./baseModel");

const userModel = baseModel("users", knex);

module.exports = userModel;
