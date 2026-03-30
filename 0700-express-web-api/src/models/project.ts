import { prisma } from "../lib/prisma";

export type ListProjectsInput = {
  userId: string;
  skip: number;
  take: number;
};

export async function listProjects(input: ListProjectsInput) {
  const [totalCount, projects] = await Promise.all([
    prisma.project.count({
      where: { userId: input.userId },
    }),
    prisma.project.findMany({
      where: { userId: input.userId },
      include: {
        tasks: {
          select: {
            kind: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: input.skip,
      take: input.take,
    }),
  ]);

  return { totalCount, projects };
}

export async function findProjectBySlug(userId: string, slug: string) {
  return prisma.project.findFirst({
    where: {
      userId,
      slug,
    },
    include: {
      tasks: {
        select: {
          kind: true,
          status: true,
        },
      },
    },
  });
}

export async function findOwnedProject(userId: string, projectId: string) {
  return prisma.project.findFirst({
    where: {
      userId,
      id: projectId,
    },
  });
}
