/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("content").notNullable();
    table
      .uuid("task_id")
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("author_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
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
  return knex.schema.dropTable("comments");
};
