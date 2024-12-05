const bcrypt = require("bcrypt");
const request = require("./util/httpRequests");
const { capitalizeFirstLetter } = require("../utils/string");

const entity = "user";
const path = `/${entity}s`;
const testedProps = ["name", "email"];

const getData = async (entity, number) => ({
  name: `Test ${entity} ${number}`,
  email: `test${entity}email${number}@gmail.com`,
  password: await bcrypt.hash(`test${entity}password${number}`, 10),
});

describe(`${capitalizeFirstLetter(entity)} Endpoints Test Cases`, () => {
  describe(`GET ${path}`, () => {
    test(`It should return a list of ${entity}s`, async () => {
      const listRes = await request.get(path);
      expect(listRes.status).toBe(200);
      expect(listRes.body).toBeInstanceOf(Array);
      for (key of ["id", ...testedProps]) {
        expect(listRes.body[0]).toHaveProperty(key);
      }
    });
  });

  describe(`GET ${path}`, () => {
    test(`It should create a new ${entity} with valid input`, async () => {
      const data = await getData(entity, Math.random());
      const createRes = await request.post(path, data);

      expect(createRes.status).toBe(201);
      expect(createRes.body).toHaveProperty("id");
      for (key of testedProps) {
        expect(createRes.body).toHaveProperty(key, data[key]);
      }
    });

    test("It should return error if required fields are missing", async () => {
      const invalidRes = await request.post(path, {});

      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });

    // Specific test for user email
    test(`It should return error when ${entity} email is already existed`, async () => {
      const data = await getData(entity, Math.random());
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);

      const invalidRes = await request.post(path, data);
      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });
  });

  describe(`GET ${path}/:id`, () => {
    test(`It should fetch an existing ${entity} by id`, async () => {
      const data = await getData(entity, Math.random());
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const findRes = await request.get(`${path}/${createdData.id}`);
      expect(findRes.status).toBe(200);
      expect(findRes.body).toHaveProperty("id");
      for (key of testedProps) {
        expect(createRes.body).toHaveProperty(key, data[key]);
      }
    });

    test(`It should return error if ${entity} id is not found`, async () => {
      const invalidRes = await request.get(`${path}/invalid-id`, {});

      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });
  });

  describe(`PUT ${path}/:id`, () => {
    test(`It should update ${entity} data with valid new input and keep the old data the same`, async () => {
      const data = await getData(entity, Math.random());
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const newData = {
        name: `Test updated ${entity} ${Math.random()}`,
      };
      const updateRes = await request.put(`${path}/${createdData.id}`, newData);
      expect(updateRes.status).toBe(200);
      expect(updateRes.body).toHaveProperty("id");
      expect(updateRes.body).toHaveProperty("name", newData.name);
      expect(updateRes.body).toHaveProperty("email", data.email);
    });

    test(`It should return error if ${entity} id is not found`, async () => {
      const invalidRes = await request.put(`${path}/invalid-id`, {});

      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });
  });

  describe(`DELETE ${path}/:id`, () => {
    test(`It should delete an existing ${entity} by id`, async () => {
      const data = await getData(entity, Math.random());
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const delRes = await request.delete(`${path}/${createdData.id}`);
      expect(delRes.status).toBe(200);

      const findRes = await request.get(`${path}/${createdData.id}`);
      expect(findRes.status).toBe(404);
    });

    test(`It should return error if ${entity} id is not found`, async () => {
      const invalidRes = await request.delete(`${path}/invalid-id`);

      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });
  });
});
