const request = require("./util/httpRequests");

describe("User Endpoints", () => {
  test("GET /users - should return a list of users", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
  });
});
