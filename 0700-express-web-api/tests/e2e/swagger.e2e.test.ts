import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../src/app";
import { prisma } from "../../src/models/prisma";
import { seedDatabase } from "../../prisma/seed";

const app = createApp();

describe("Swagger E2E", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST /auth/signup satisfies the swagger contract", async () => {
    const response = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "swagger-user",
        email: "swagger-user@example.com",
        email_confirmation: "swagger-user@example.com",
        password: "secret123",
        password_confirmation: "secret123",
      });

    expect(response.status).toBe(200);
    expect(response.body.data.uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.refreshToken).toEqual(expect.any(String));
    expect(response.headers["set-cookie"]).toEqual(
      expect.arrayContaining([
        expect.stringContaining("access_token="),
        expect.stringContaining("refresh_token="),
      ]),
    );
  });

  it("POST /auth/login and GET /users/me satisfy the swagger contract", async () => {
    const agent = request.agent(app);

    const loginResponse = await agent.post("/api/v1/auth/login").send({
      email: "demo@example.com",
      password: "password",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.data.uuid).toEqual(expect.any(String));
    expect(loginResponse.body.data.accessToken).toEqual(expect.any(String));
    expect(loginResponse.body.data.refreshToken).toEqual(expect.any(String));

    const meResponse = await agent.get("/api/v1/users/me");

    expect(meResponse.status).toBe(200);
    expect(meResponse.body).toEqual({
      data: {
        id: expect.any(String),
        username: "demo-user",
        email: "demo@example.com",
        status: "active",
      },
    });
  });

  it("GET /users/projects and GET /users/projects/{slug} satisfy the swagger contract", async () => {
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "demo@example.com",
      password: "password",
    });
    const accessToken = loginResponse.body.data.accessToken;

    const projectsResponse = await request(app)
      .get("/api/v1/users/projects?limit=3&page=1")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(projectsResponse.status).toBe(200);
    expect(projectsResponse.body.pageInfo).toEqual({
      totalCount: 10,
      limit: 3,
      page: 1,
      hasNext: true,
      hasPrevious: false,
    });
    expect(projectsResponse.body.data).toHaveLength(3);
    expect(projectsResponse.body.data[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
      goal: expect.any(String),
      stats: {
        total: expect.any(Number),
        kinds: {
          milestone: expect.any(Number),
          task: expect.any(Number),
          total: expect.any(Number),
        },
        states: {
          scheduled: expect.any(Number),
          completed: expect.any(Number),
          archived: expect.any(Number),
        },
      },
    });

    const slug = projectsResponse.body.data[0].slug;
    const projectResponse = await request(app)
      .get(`/api/v1/users/projects/${slug}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(projectResponse.status).toBe(200);
    expect(projectResponse.body.data.slug).toBe(slug);
  });

  it("GET /users/tasks satisfies the swagger contract", async () => {
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "demo@example.com",
      password: "password",
    });
    const accessToken = loginResponse.body.data.accessToken;

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

  it("task CRUD endpoints satisfy the swagger contract", async () => {
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "demo@example.com",
      password: "password",
    });
    const accessToken = loginResponse.body.data.accessToken;

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
});
