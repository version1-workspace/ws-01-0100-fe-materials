import request from "supertest";
import { describe, expect, it } from "vitest";
import { app, useE2ESetup } from "./helper";

describe("User E2E", () => {
  useE2ESetup();

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

  it("GET /users/me returns 401 without authentication", async () => {
    const response = await request(app).get("/api/v1/users/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });
});
