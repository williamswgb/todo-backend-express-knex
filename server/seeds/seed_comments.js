/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();

  const firstUser = await knex("users")
    .select("id")
    .orderBy("id", "asc")
    .first();
  if (!firstUser) {
    throw new Error("No user found in the users table");
  }
  const firstTask = await knex("tasks")
    .select("id")
    .orderBy("id", "asc")
    .first();
  if (!firstTask) {
    throw new Error("No task found in the tasks table");
  }
  await knex("comments").insert([
    {
      content: "My Comment",
      task_id: firstTask.id,
      author_id: firstUser.id,
    },
  ]);
};
