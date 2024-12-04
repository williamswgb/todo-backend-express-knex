/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("organisations").del();
  await knex("organisations").insert([
    {
      name: "My Organisation",
      description: "My Description Organisation",
    },
  ]);
};
