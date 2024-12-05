const request = require("./util/httpRequests");
const { capitalizeFirstLetter } = require("../utils/string");
const { getUserData } = require("./user.test");

const entity = "organisation";
const path = `/${entity}s`;
const testedProps = ["name", "description"];

const getData = (entity, number) => ({
  name: `Test ${entity} ${number}`,
  description: `Test ${entity} description ${number}`,
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

  describe(`POST ${path}`, () => {
    test(`It should create a new ${entity} with valid input`, async () => {
      const data = getData(entity, Math.random());
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
  });

  describe(`GET ${path}/:id`, () => {
    test(`It should fetch an existing ${entity} by id`, async () => {
      const data = getData(entity, Math.random());
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
      const data = getData(entity, Math.random());
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
      expect(updateRes.body).toHaveProperty("description", data.description);
    });

    test(`It should return error if ${entity} id is not found`, async () => {
      const invalidRes = await request.put(`${path}/invalid-id`, {});

      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });
  });

  describe(`DELETE ${path}/:id`, () => {
    test(`It should delete an existing ${entity} by id`, async () => {
      const data = getData(entity, Math.random());
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

  describe(`POST ${path}/add-user`, () => {
    test(`It should add a user into ${entity}`, async () => {
      const orgData = getData(entity, Math.random());
      const createOrgRes = await request.post(path, orgData);
      expect(createOrgRes.status).toBe(201);
      const createdOrg = createOrgRes.body;

      const userData = await getUserData("user", Math.random());
      const createUserRes = await request.post("/users", userData);
      const createdUser = createUserRes.body;

      const addUserRes = await request.post(
        `${path}/${createdOrg.id}/add-user`,
        {
          user_id: createdUser.id,
        }
      );

      expect(addUserRes.status).toBe(201);
      expect(addUserRes.body).toHaveProperty("user_id", createdUser.id);
      expect(addUserRes.body).toHaveProperty("organisation_id", createdOrg.id);
    });

    test("It should return error if required fields are missing", async () => {
      // Test with both invalid id
      const invalidRes = await request.post(
        `${path}/invalid-organisation-id/add-user`,
        {}
      );
      expect(invalidRes.status).toBe(400);

      // Test with empty user id
      const data = getData(entity, Math.random());
      const createOrgRes = await request.post(path, data);
      expect(createOrgRes.status).toBe(201);
      const createdOrg = createOrgRes.body;

      const addUserRes = await request.post(
        `${path}/${createdOrg.id}/add-user`,
        {}
      );
      expect(addUserRes.status).toBe(400);
    });
  });

  describe(`POST ${path}/remove-user`, () => {
    test(`It should remove a user from ${entity}`, async () => {
      // Create dummy organisation data
      const orgData = getData(entity, Math.random());
      const createOrgRes = await request.post(path, orgData);
      expect(createOrgRes.status).toBe(201);
      const createdOrg = createOrgRes.body;

      // Create dummy user data
      const userData = await getUserData("user", Math.random());
      const createUserRes = await request.post("/users", userData);
      const createdUser = createUserRes.body;

      // Add user to organisation
      const addUserRes = await request.post(
        `${path}/${createdOrg.id}/add-user`,
        {
          user_id: createdUser.id,
        }
      );
      expect(addUserRes.status).toBe(201);

      // Remove user from organisation
      const removeUserRes = await request.post(
        `${path}/${createdOrg.id}/remove-user`,
        {
          user_id: createdUser.id,
        }
      );
      expect(removeUserRes.status).toBe(200);
    });

    test("It should return error if required fields are missing", async () => {
      // Test with both invalid id
      const invalidRes = await request.post(
        `${path}/invalid-organisation-id/remove-user`,
        {}
      );
      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");

      // Test with empty user id
      const data = getData(entity, Math.random());
      const createOrgRes = await request.post(path, data);
      expect(createOrgRes.status).toBe(201);
      const createdOrg = createOrgRes.body;

      const removeUserRes = await request.post(
        `${path}/${createdOrg.id}/remove-user`,
        {}
      );
      expect(removeUserRes.status).toBe(500);
      expect(removeUserRes.body).toHaveProperty("error");
    });
  });
});

module.exports = {
  getOrganisationData: getData,
};
