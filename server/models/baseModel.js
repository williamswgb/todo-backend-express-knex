const BaseModel = (tableName, knexInstance) => ({
  async create(data) {
    const [createdRecord] = await knexInstance(tableName)
      .insert(data)
      .returning("*");
    return createdRecord;
  },
  async list({ limit = 10, offset = 0 }) {
    return await knexInstance(tableName)
      .select("*")
      .where({ deleted_at: null })
      .limit(limit)
      .offset(offset);
  },

  async findById(id) {
    return await knexInstance(tableName)
      .where({ id, deleted_at: null })
      .first();
  },

  async update(id, data) {
    const [updatedRecord] = await knexInstance(tableName)
      .where({ id, deleted_at: null })
      .update({ ...data, updated_at: knex.fn.now() })
      .returning("*");
    return updatedRecord;
  },
  async softDelete(id) {
    const [deletedRecord] = await knexInstance(tableName)
      .where({ id, deleted_at: null })
      .update({ deleted_at: knex.fn.now() })
      .returning("*");
    return deletedRecord;
  },
});

module.exports = BaseModel;
