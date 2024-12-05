/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("tasks_assignees", function (table) {
    table.index(["task_id", "assignee_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("tasks_assignees", function (table) {
    table.dropIndex(["task_id", "assignee_id"]);
  });
};
