/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();

  const firstProject = await knex("projects")
    .select("id")
    .orderBy("id", "asc")
    .first();
  if (!firstProject) {
    throw new Error("No project found in the projects table");
  }
  await knex("tasks").insert([
    {
      title: "My Task",
      description: "My Description Task",
      status: "in_progress",
      priority: "high",
      due_date: knex.fn.now(),
      project_id: firstProject.id,
    },
  ]);
};
