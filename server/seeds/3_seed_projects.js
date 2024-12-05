/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("projects").del();

  const firstOrganisation = await knex("organisations")
    .select("id")
    .orderBy("id", "asc")
    .first();
  if (!firstOrganisation) {
    throw new Error("No organisation found in the organisations table");
  }
  await knex("projects").insert([
    {
      name: "My Project",
      description: "My Description Project",
      organisation_id: firstOrganisation.id,
    },
  ]);
};
