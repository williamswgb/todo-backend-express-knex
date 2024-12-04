const UserModel = require("../models/userModel");
const baseController = require("./baseController");

const userController = baseController("User", UserModel);

module.exports = userController;
