const request = require("./util/httpRequests");
const { capitalizeFirstLetter } = require("../utils/string");

const { getOrganisationData } = require("./organisation.test");
const { getProjectData } = require("./project.test");
const { getUserData } = require("./user.test");

const entity = "task";
const path = `/${entity}s`;
const dependencyPath = "/projects";
const testedProps = ["title", "description", "project_id"];

const getData = (entity, number, id) => ({
  title: `Test ${entity} ${number}`,
  description: `Test ${entity} description ${number}`,
  project_id: id,
});

describe(`${capitalizeFirstLetter(entity)} Endpoints Test Cases`, () => {
  beforeAll(async () => {
    const userData = await getUserData("user", Math.random());
    const createUserRes = await request.post("/users", userData);

    const orgData = getOrganisationData("organisation", Math.random());
    const createOrgRes = await request.post("/organisations", orgData);

    const projectData = getProjectData("project", Math.random());
    const createProjectRes = await request.post("/projects", projectData);
  });

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
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
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
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
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
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const newData = {
        title: `Test updated ${entity} ${Math.random()}`,
      };
      const updateRes = await request.put(`${path}/${createdData.id}`, newData);
      expect(updateRes.status).toBe(200);
      expect(updateRes.body).toHaveProperty("id");
      expect(updateRes.body).toHaveProperty("title", newData.title);
      expect(updateRes.body).toHaveProperty("description", data.description);
      expect(updateRes.body).toHaveProperty("project_id", data.project_id);
    });

    test(`It should return error if ${entity} id is not found`, async () => {
      const invalidRes = await request.put(`${path}/invalid-id`, {});

      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");
    });
  });

  describe(`DELETE ${path}/:id`, () => {
    test(`It should delete an existing ${entity} by id`, async () => {
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
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

  describe(`POST ${path}/assign`, () => {
    test(`It should add a user into ${entity}`, async () => {
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      // Get dummy user data
      const listUserRes = await request.get("/users");
      const dummyUser = listUserRes.body[0];

      // Add user to entity
      const addUserRes = await request.post(
        `${path}/${createdData.id}/assign`,
        {
          user_id: dummyUser.id,
        }
      );
      expect(addUserRes.status).toBe(201);
      expect(addUserRes.body).toHaveProperty("assignee_id", dummyUser.id);
      expect(addUserRes.body).toHaveProperty(`${entity}_id`, createdData.id);
    });

    test("It should return error if required fields are missing", async () => {
      // Test with both invalid id
      const invalidRes = await request.post(`${path}/invalid-id/assign`, {});
      expect(invalidRes.status).toBe(400);

      // Test with empty user id
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const addUserRes = await request.post(
        `${path}/${createdData.id}/assign`,
        {}
      );
      expect(addUserRes.status).toBe(400);
    });
  });

  describe(`POST ${path}/unassign`, () => {
    test(`It should remove a user from ${entity}`, async () => {
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      // Get dummy user data
      const listUserRes = await request.get("/users");
      const dummyUser = listUserRes.body[0];

      // Add user to entity
      const addUserRes = await request.post(
        `${path}/${createdData.id}/assign`,
        {
          user_id: dummyUser.id,
        }
      );
      expect(addUserRes.status).toBe(201);

      // Remove user from entity
      const removeUserRes = await request.post(
        `${path}/${createdData.id}/unassign`,
        {
          user_id: dummyUser.id,
        }
      );
      expect(removeUserRes.status).toBe(200);
    });

    test("It should return error if required fields are missing", async () => {
      // Test with both invalid id
      const invalidRes = await request.post(`${path}/invalid-id/unassign`, {});
      expect(invalidRes.status).toBe(500);
      expect(invalidRes.body).toHaveProperty("error");

      // Test with empty user id
      // Get a dummy dependency data
      const listDependencyRes = await request.get(dependencyPath);
      const dummyDependencyData = listDependencyRes.body[0];

      // Create a dummy entity data
      const data = getData(entity, Math.random(), dummyDependencyData.id);
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const removeUserRes = await request.post(
        `${path}/${createdData.id}/unassign`,
        {}
      );
      expect(removeUserRes.status).toBe(500);
      expect(removeUserRes.body).toHaveProperty("error");
    });
  });
});

module.exports = {
  getProjectData: getData,
};