import request from "supertest";
import { describe, expect, it } from "vitest";
import { app, loginAsDemoUser, useE2ESetup } from "./helper";

describe("Project E2E", () => {
  useE2ESetup();

  it("GET /users/projects and GET /users/projects/{slug} satisfy the swagger contract", async () => {
    const accessToken = await loginAsDemoUser();

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

  it("GET /users/projects supports pagination", async () => {
    const accessToken = await loginAsDemoUser();

    const firstPageResponse = await request(app)
      .get("/api/v1/users/projects?limit=4&page=1")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(firstPageResponse.status).toBe(200);
    expect(firstPageResponse.body.data).toHaveLength(4);
    expect(firstPageResponse.body.pageInfo).toEqual({
      totalCount: 10,
      limit: 4,
      page: 1,
      hasNext: true,
      hasPrevious: false,
    });

    const secondPageResponse = await request(app)
      .get("/api/v1/users/projects?limit=4&page=2")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(secondPageResponse.status).toBe(200);
    expect(secondPageResponse.body.data).toHaveLength(4);
    expect(secondPageResponse.body.pageInfo).toEqual({
      totalCount: 10,
      limit: 4,
      page: 2,
      hasNext: true,
      hasPrevious: true,
    });

    const thirdPageResponse = await request(app)
      .get("/api/v1/users/projects?limit=4&page=3")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(thirdPageResponse.status).toBe(200);
    expect(thirdPageResponse.body.data).toHaveLength(2);
    expect(thirdPageResponse.body.pageInfo).toEqual({
      totalCount: 10,
      limit: 4,
      page: 3,
      hasNext: false,
      hasPrevious: true,
    });
  });

  it("GET /users/projects/{slug} returns 404 when the project does not exist", async () => {
    const accessToken = await loginAsDemoUser();

    const response = await request(app)
      .get("/api/v1/users/projects/not-found-project")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Project not found",
    });
  });

  it("GET /users/projects returns 401 without authentication", async () => {
    const response = await request(app).get("/api/v1/users/projects?limit=3&page=1");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("GET /users/projects/{slug} returns 401 without authentication", async () => {
    const response = await request(app).get("/api/v1/users/projects/project-1");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });
});
