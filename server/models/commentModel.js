const knex = require("../database/connection");
const baseModel = require("./baseModel");

const commentModel = baseModel("comments", knex);

module.exports = commentModel;
