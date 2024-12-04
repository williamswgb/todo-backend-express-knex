/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("title").notNullable();
    table.string("description").nullable();
    table.enu("status", ["to_do", "in_progress", "done"]).defaultTo("to_do");
    table.enu("priority", ["low", "medium", "high"]).nullable();
    table.timestamp("due_date").nullable();
    table
      .uuid("project_id")
      .references("id")
      .inTable("projects")
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
  return knex.schema.dropTable("tasks");
};
