const baseController = require("./baseController");
const baseUserEntityController = require("./baseUserEntityController");

const TaskModel = require("../models/taskModel");

const taskController = {
  ...baseController(TaskModel, "Task"),
  ...baseUserEntityController(TaskModel, "Task", "Assignee"),
};

module.exports = taskController;
