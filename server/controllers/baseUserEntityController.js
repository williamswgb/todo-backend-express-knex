const baseUserEntityController = (model, entityName, userName = "User") => ({
  async addUser(req, res) {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      if (!id || !user_id) {
        return res.status(400).json({
          message: `Empty ${entityName.toLowerCase()} id or ${userName.toLowerCase()} id`,
        });
      }

      const data = await model.addUserToEntity(
        id,
        entityName.toLowerCase(),
        user_id,
        userName.toLowerCase()
      );
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async removeUser(req, res) {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      await model.removeUserFromEntity(
        id,
        entityName.toLowerCase(),
        user_id,
        userName.toLowerCase()
      );

      res.status(200).json({
        message: `${userName} has been successfully removed from ${entityName.toLowerCase()}`,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
});

module.exports = baseUserEntityController;
