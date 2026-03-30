import { prisma } from "./prisma";

export type TaskStatus = "scheduled" | "completed" | "archived";

export type ListTasksInput = {
  userId: string;
  skip: number;
  take: number;
  statuses: TaskStatus[];
};

export type CreateTaskInput = {
  userId: string;
  projectId: string;
  title: string;
  kind: string;
  description: string;
  status: string;
  deadline: Date;
  startingAt?: Date | null;
};

export type UpdateTaskInput = {
  title?: string;
  kind?: string;
  description?: string;
  status?: string;
  projectId?: string;
  deadline?: Date;
  startingAt?: Date | null;
};

function taskDetailInclude() {
  return {
    project: {
      include: {
        tasks: {
          select: {
            kind: true,
            status: true,
          },
        },
      },
    },
    parent: true,
    children: true,
  } as const;
}

export async function listTasks(input: ListTasksInput) {
  const where = {
    userId: input.userId,
    ...(input.statuses.length > 0 ? { status: { in: input.statuses } } : {}),
  };

  const [totalCount, tasks] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      include: {
        project: {
          include: {
            tasks: {
              select: {
                kind: true,
                status: true,
              },
            },
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

  return { totalCount, tasks };
}

export async function createTask(input: CreateTaskInput) {
  const now = new Date();

  return prisma.task.create({
    data: {
      userId: input.userId,
      projectId: input.projectId,
      title: input.title,
      kind: input.kind,
      description: input.description,
      status: input.status,
      deadline: input.deadline,
      startingAt: input.startingAt,
      startedAt: input.status === "completed" ? now : null,
      finishedAt: input.status === "completed" ? now : null,
      archivedAt: input.status === "archived" ? now : null,
    },
    include: {
      project: {
        include: {
          tasks: {
            select: {
              kind: true,
              status: true,
            },
          },
        },
      },
    },
  });
}

export async function findTaskById(userId: string, taskId: string) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
    include: taskDetailInclude(),
  });
}

export async function updateTask(
  taskId: string,
  currentStatus: string,
  currentStartedAt: Date | null,
  input: UpdateTaskInput,
) {
  const nextStatus = input.status ?? currentStatus;
  const now = new Date();

  return prisma.task.update({
    where: { id: taskId },
    data: {
      title: input.title ?? undefined,
      kind: input.kind ?? undefined,
      description: input.description ?? undefined,
      status: input.status ?? undefined,
      projectId: input.projectId ?? undefined,
      deadline: input.deadline ?? undefined,
      startingAt: input.startingAt,
      startedAt: nextStatus === "completed" && !currentStartedAt ? now : undefined,
      finishedAt: nextStatus === "completed" ? now : nextStatus === "scheduled" ? null : undefined,
      archivedAt: nextStatus === "archived" ? now : nextStatus !== "archived" ? null : undefined,
    },
    include: taskDetailInclude(),
  });
}

export async function deleteTask(taskId: string) {
  return prisma.task.delete({
    where: { id: taskId },
  });
}
