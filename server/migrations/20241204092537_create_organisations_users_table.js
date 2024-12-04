/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("organisations_users", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table
      .uuid("organisation_id")
      .references("id")
      .inTable("organisations")
      .onDelete("CASCADE");
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table.enu("role", ["admin", "member"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("deleted_at").nullable(); // Soft delete
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("organisations_members");
};
