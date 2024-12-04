const knex = require("../database/connection");
const baseModel = require("./baseModel");
const baseUserEntityModel = require("./baseUserEntityModel");

const taskModel = {
  ...baseModel("tasks", knex),
  ...baseUserEntityModel("tasks_assignees", knex),
};

module.exports = taskModel;
