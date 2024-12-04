const UserModel = require("../models/userModel");
const baseController = require("./baseController");

const userController = baseController(UserModel, "User");

module.exports = userController;
