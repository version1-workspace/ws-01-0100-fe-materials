import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { createUser } from "../src/models/user";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
});

async function main() {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const user = await createUser({
    email: "demo@example.com",
    username: "demo-user",
    password: "password",
    refreshToken: "demo-refresh-token",
  });

  for (let projectNumber = 1; projectNumber <= 10; projectNumber += 1) {
    const project = await prisma.project.create({
      data: {
        name: `Project ${projectNumber}`,
        userId: user.id,
        slug: `project-${projectNumber}`,
        goal: `Project ${projectNumber} のゴールを達成する`,
        shouldbe: `Project ${projectNumber} が運用可能な状態になっている`,
        status: "initial",
        deadline: new Date(`2026-05-${String(projectNumber).padStart(2, "0")}T23:59:59+09:00`),
      },
    });

    const milestone = await prisma.task.create({
      data: {
        userId: user.id,
        projectId: project.id,
        kind: "milestone",
        title: `Project ${projectNumber} のマイルストーン`,
        description: `Project ${projectNumber} 全体の進行を管理するマイルストーン`,
        status: "scheduled",
        deadline: new Date(`2026-04-${String(projectNumber).padStart(2, "0")}T23:59:59+09:00`),
      },
    });

    const taskCount = projectNumber * 10;
    const tasks = Array.from({ length: taskCount - 1 }, (_, index) => {
      const taskNumber = index + 1;

      return {
        userId: user.id,
        projectId: project.id,
        parentId: milestone.id,
        kind: "task",
        title: `Project ${projectNumber} Task ${taskNumber}`,
        description: `Project ${projectNumber} のタスク ${taskNumber} です`,
        status: taskNumber % 3 === 0 ? "completed" : "scheduled",
        deadline: new Date(
          `2026-06-${String(((taskNumber - 1) % 28) + 1).padStart(2, "0")}T23:59:59+09:00`,
        ),
        startedAt: taskNumber % 3 === 0 ? new Date("2026-03-29T09:00:00+09:00") : null,
        finishedAt: taskNumber % 3 === 0 ? new Date("2026-03-29T18:00:00+09:00") : null,
      };
    });

    await prisma.task.createMany({
      data: tasks,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
