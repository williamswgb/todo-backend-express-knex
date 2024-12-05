/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks_assignees", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table
      .uuid("task_id")
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("assignee_id")
      .references("id")
      .inTable("users")
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
  return knex.schema.dropTable("tasks_assignees");
};
