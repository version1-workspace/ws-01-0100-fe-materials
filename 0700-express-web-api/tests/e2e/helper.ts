import request from "supertest";
import { afterAll, beforeEach } from "vitest";
import { createApp } from "../../src/app";
import { prisma } from "../../src/models/prisma";
import { seedDatabase } from "../../prisma/seed";

export const app = createApp();

export function useE2ESetup() {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
}

export async function loginAsDemoUser() {
  const response = await request(app).post("/api/v1/auth/login").send({
    email: "demo@example.com",
    password: "password",
  });

  return response.body.data.accessToken as string;
}
