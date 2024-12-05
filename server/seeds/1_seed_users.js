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
      name: `My User ${Math.random()}`,
      email: `My Email ${Math.random()}`,
      password: await bcrypt.hash(`My Password ${Math.random()}`, 10),
    },
  ]);
};
