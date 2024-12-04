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
      id: knex.fn.uuid(),
      name: "William",
      email: "williamsw.gb@gmail.com",
      password: await bcrypt.hash("123456", 10),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};
