const baseUserEntityController = (entityName, model) => ({
  async addUser(req, res) {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      if (!id || !user_id) {
        return res
          .status(400)
          .json({ message: `Empty ${entityName.toLowerCase()} id or user id` });
      }

      const data = await model.addUserToEntity(
        entityName.toLowerCase(),
        id,
        user_id
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

      await model.removeUserFromEntity(entityName.toLowerCase(), id, user_id);

      res.status(200).json({
        message: `User has been successfully removed from ${entityName.toLowerCase()}`,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
});

module.exports = baseUserEntityController;
