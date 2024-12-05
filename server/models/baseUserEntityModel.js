const BaseUserEntityModel = (tableName, knexInstance) => ({
  async addUserToEntity(entityId, entityName, userId, userName) {
    const [createdRecord] = await knexInstance(tableName)
      .insert({
        [`${entityName}_id`]: entityId,
        [`${userName}_id`]: userId,
      })
      .returning("*");
    return createdRecord;
  },
  async removeUserFromEntity(entityId, entityName, userId, userName) {
    return await knexInstance(tableName)
      .where({
        [`${entityName}_id`]: entityId,
        [`${userName}_id`]: userId,
      })
      .del();
  },
});

module.exports = BaseUserEntityModel;
