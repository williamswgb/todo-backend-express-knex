const BaseUserEntityModel = (tableName, knexInstance) => ({
  async addUserToEntity(entityName, entityId, userId) {
    const [createdRecord] = await knexInstance(tableName)
      .insert({
        [`${entityName}_id`]: entityId,
        user_id: userId,
      })
      .returning("*");
    return createdRecord;
  },

  async removeUserFromEntity(entityName, entityId, userId) {
    return await knexInstance(tableName)
      .where({ [`${entityName}_id`]: entityId, user_id: userId })
      .del();
  },
});

module.exports = BaseUserEntityModel;
