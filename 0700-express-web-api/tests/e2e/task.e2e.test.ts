import request from "supertest";
import { describe, expect, it } from "vitest";
import { app, loginAsDemoUser, useE2ESetup } from "./helper";

describe("Task E2E", () => {
  useE2ESetup();

  it("GET /users/tasks satisfies the swagger contract", async () => {
    const accessToken = await loginAsDemoUser();

    const response = await request(app)
      .get("/api/v1/users/tasks?limit=5&page=1&status=scheduled,completed")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.pageInfo.limit).toBe(5);
    expect(response.body.pageInfo.page).toBe(1);
    expect(response.body.data).toHaveLength(5);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      status: expect.stringMatching(/scheduled|completed|archived/),
      deadline: expect.any(String),
      project: {
        id: expect.any(String),
        slug: expect.any(String),
      },
      children: expect.any(Array),
    });
  });

  it("GET /users/tasks supports pagination", async () => {
    const accessToken = await loginAsDemoUser();

    const firstPageResponse = await request(app)
      .get("/api/v1/users/tasks?limit=20&page=1")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(firstPageResponse.status).toBe(200);
    expect(firstPageResponse.body.data).toHaveLength(20);
    expect(firstPageResponse.body.pageInfo).toEqual({
      totalCount: 550,
      limit: 20,
      page: 1,
      hasNext: true,
      hasPrevious: false,
    });

    const lastPageResponse = await request(app)
      .get("/api/v1/users/tasks?limit=200&page=3")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(lastPageResponse.status).toBe(200);
    expect(lastPageResponse.body.data).toHaveLength(150);
    expect(lastPageResponse.body.pageInfo).toEqual({
      totalCount: 550,
      limit: 200,
      page: 3,
      hasNext: false,
      hasPrevious: true,
    });
  });

  it("task CRUD endpoints satisfy the swagger contract", async () => {
    const accessToken = await loginAsDemoUser();

    const projectsResponse = await request(app)
      .get("/api/v1/users/projects?limit=1&page=1")
      .set("Authorization", `Bearer ${accessToken}`);
    const projectId = projectsResponse.body.data[0].id;

    const createResponse = await request(app)
      .post("/api/v1/users/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Swagger task",
        kind: "task",
        description: "created by e2e",
        status: "scheduled",
        projectId,
        deadline: "2026-12-31",
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.data.title).toBe("Swagger task");
    const taskId = createResponse.body.data.id;

    const showResponse = await request(app)
      .get(`/api/v1/users/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(showResponse.status).toBe(200);
    expect(showResponse.body.data.id).toBe(taskId);

    const updateResponse = await request(app)
      .patch(`/api/v1/users/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        description: "updated by e2e",
        status: "archived",
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.description).toBe("updated by e2e");
    expect(updateResponse.body.data.status).toBe("archived");

    const deleteResponse = await request(app)
      .delete(`/api/v1/users/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.data.id).toBe(taskId);
  });

  it("GET /users/tasks/{id} returns 404 when the task does not exist", async () => {
    const accessToken = await loginAsDemoUser();

    const response = await request(app)
      .get("/api/v1/users/tasks/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Task not found",
    });
  });

  it("GET /users/tasks returns 401 without authentication", async () => {
    const response = await request(app).get("/api/v1/users/tasks?limit=5&page=1");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("GET /users/tasks/{id} returns 401 without authentication", async () => {
    const response = await request(app).get("/api/v1/users/tasks/00000000-0000-0000-0000-000000000000");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("POST /users/tasks returns 401 without authentication", async () => {
    const response = await request(app).post("/api/v1/users/tasks").send({
      title: "Unauthorized task",
      kind: "task",
      description: "unauthorized",
      status: "scheduled",
      projectId: "00000000-0000-0000-0000-000000000000",
      deadline: "2026-12-31",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });
});
