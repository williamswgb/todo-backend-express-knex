/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("projects", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("name").notNullable();
    table.string("description").nullable();
    table
      .uuid("organisation_id")
      .references("id")
      .inTable("organisations")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
