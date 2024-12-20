const knex = require("../database/connection");

beforeAll(async () => {
  console.log("Global setup: Setting up the test database...");
  await knex.migrate.latest();
});

afterAll(async () => {
  console.log("Global teardown: Cleaning up the test database...");
  await knex.destroy();
});
