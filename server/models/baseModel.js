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
      .limit(limit)
      .offset(offset);
  },

  async findById(id) {
    return await knexInstance(tableName).where({ id }).first();
  },

  async update(id, data) {
    const [updatedRecord] = await knexInstance(tableName)
      .where({ id })
      .update({ ...data, updated_at: knexInstance.fn.now() })
      .returning("*");
    return updatedRecord;
  },

  async delete(id) {
    return await knexInstance(tableName).where({ id }).del();
  },
});

module.exports = BaseModel;
