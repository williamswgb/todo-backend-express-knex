const knex = require("../database/connection");

const OrganisationModel = {
  create: (data) => knex("organisations").insert(data).returning("*"),
  list: ({ limit = 10, offset = 0 }) =>
    knex("organisations")
      .where({ deleted_at: null })
      .limit(limit)
      .offset(offset),
  findById: (id) =>
    knex("organisations").where({ id, deleted_at: null }).first(),
  update: (id, data) =>
    knex("organisations")
      .where({ id, deleted_at: null })
      .update({ ...data, updated_at: knex.fn.now() })
      .returning("*"),
  softDelete: (id) =>
    knex("organisations")
      .where({ id, deleted_at: null })
      .update({ deleted_at: knex.fn.now() })
      .returning("*"),
};

module.exports = OrganisationModel;
