const request = require("./util/httpRequests");
const { capitalizeFirstLetter } = require("../utils/string");

const { getOrganisationData } = require("./organisation.test");
const { getProjectData } = require("./project.test");
const { getTaskData } = require("./task.test");
const { getUserData } = require("./user.test");

const entity = "comment";
const path = `/${entity}s`;
const dependencyPath = "/tasks";
const testedProps = ["content", "task_id", "author_id"];

const getData = (entity, number, task_id, author_id) => ({
  content: `Test ${entity} ${number}`,
  task_id,
  author_id,
});

describe(`${capitalizeFirstLetter(entity)} Endpoints Test Suite`, () => {
  beforeAll(async () => {
    const userData = await getUserData("user", Math.random());
    const createUserRes = await request.post("/users", userData);

    const orgData = getOrganisationData("organisation", Math.random());
    const createOrgRes = await request.post("/organisations", orgData);
    const createdOrg = createOrgRes.body;

    const projectData = getProjectData("project", Math.random(), createdOrg.id);
    const createProjectRes = await request.post("/projects", projectData);
    const createdProject = createProjectRes.body;

    const taskData = getTaskData("task", Math.random(), createdProject.id);
    const createTaskRes = await request.post("/tasks", taskData);
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
      const listUserRes = await request.get("/users");
      const dummyUser = listUserRes.body[0];

      // Create a dummy entity data
      const data = getData(
        entity,
        Math.random(),
        dummyDependencyData.id,
        dummyUser.id
      );
      const createRes = await request.post(path, data);
      const createdData = createRes.body;

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
      const listUserRes = await request.get("/users");
      const dummyUser = listUserRes.body[0];

      // Create a dummy entity data
      const data = getData(
        entity,
        Math.random(),
        dummyDependencyData.id,
        dummyUser.id
      );
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const findRes = await request.get(`${path}/${createdData.id}`);
      expect(findRes.status).toBe(200);
      expect(createRes.body).toHaveProperty("id");
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
      const listUserRes = await request.get("/users");
      const dummyUser = listUserRes.body[0];

      // Create a dummy entity data
      const data = getData(
        entity,
        Math.random(),
        dummyDependencyData.id,
        dummyUser.id
      );
      const createRes = await request.post(path, data);
      expect(createRes.status).toBe(201);
      const createdData = createRes.body;

      const newData = {
        content: `Test updated ${entity} ${Math.random()}`,
      };
      const updateRes = await request.put(`${path}/${createdData.id}`, newData);
      expect(updateRes.status).toBe(200);
      expect(updateRes.body).toHaveProperty("id");
      expect(updateRes.body).toHaveProperty("content", newData.content);
      expect(updateRes.body).toHaveProperty("author_id", createdData.author_id);
      expect(updateRes.body).toHaveProperty("task_id", createdData.task_id);
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
      const listUserRes = await request.get("/users");
      const dummyUser = listUserRes.body[0];

      // Create a dummy entity data
      const data = getData(
        entity,
        Math.random(),
        dummyDependencyData.id,
        dummyUser.id
      );
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

module.exports = {
  getCommentData: getData,
};
