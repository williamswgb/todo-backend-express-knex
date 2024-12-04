const bcrypt = require("bcrypt"); // For password hashing

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      name: "My Name",
      email: "My Email",
      password: await bcrypt.hash("My Password", 10),
    },
  ]);
};
