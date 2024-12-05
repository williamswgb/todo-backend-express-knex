const request = require("./util/httpRequests");
const bcrypt = require("bcrypt");

describe("User Endpoints", () => {
  describe("GET /users", () => {
    test("It should return a list of users", async () => {
      const response = await request.get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("email");
    });
  });

  describe("POST /users", () => {
    test("It should create a new user", async () => {
      const newUser = {
        name: `Test User ${Math.random()}`,
        email: `testemail${Math.random()}@gmail.com`,
        password: await bcrypt.hash(`testpassword${Math.random}`, 10),
      };
      const response = await request.post("/users", newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", newUser.name);
      expect(response.body).toHaveProperty("email", newUser.email);
    });

    test("It should return 500 if required fields are missing", async () => {
      const response = await request.post("/users", {});

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /users/:id", () => {
    test("It should fetch a user by id", async () => {
      const newUser = {
        name: `Test User ${Math.random()}`,
        email: `testemail${Math.random()}@gmail.com`,
        password: await bcrypt.hash(`testpassword${Math.random}`, 10),
      };
      const createRes = await request.post("/users", newUser);
      expect(createRes.status).toBe(201);
      const createdUser = createRes.body;

      const response = await request.get(`/users/${createdUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", newUser.name);
      expect(response.body).toHaveProperty("email", newUser.email);
    });

    test("It should return 500 if user id is not found", async () => {
      const response = await request.get("/users/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /users/:id", () => {
    test("It should update user data", async () => {
      const oldUser = {
        name: `Test User ${Math.random()}`,
        email: `testemail${Math.random()}@gmail.com`,
        password: await bcrypt.hash(`testpassword${Math.random}`, 10),
      };
      const createRes = await request.post("/users", oldUser);
      expect(createRes.status).toBe(201);
      const createdUser = createRes.body;

      const newUser = {
        name: `Test Updated User ${Math.random()}`,
      };
      const response = await request.put(`/users/${createdUser.id}`, newUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", newUser.name);
      expect(response.body).toHaveProperty("email", oldUser.email);
    });

    test("It should return 500 if user id is not found", async () => {
      const response = await request.put("/users/1", {});

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("DELETE /users/:id", () => {
    test("It should delete user by id", async () => {
      const newUser = {
        name: `Test User ${Math.random()}`,
        email: `testemail${Math.random()}@gmail.com`,
        password: await bcrypt.hash(`testpassword${Math.random}`, 10),
      };
      const createRes = await request.post("/users", newUser);
      expect(createRes.status).toBe(201);
      const createdUser = createRes.body;

      const delResp = await request.delete(`/users/${createdUser.id}`);
      expect(delResp.status).toBe(200);

      const findResp = await request.get(`/users/${createdUser.id}`);
      expect(findResp.status).toBe(404);
    });

    test("It should return 500 if user id is not found", async () => {
      const response = await request.delete("/users/1", {});

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });
});
