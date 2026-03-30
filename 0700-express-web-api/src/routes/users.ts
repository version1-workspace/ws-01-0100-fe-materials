import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { prisma } from "../lib/prisma";

const router = Router();

type TaskStatus = "scheduled" | "completed" | "archived";

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function toOptionalDate(value: unknown): Date | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === "") {
    return null;
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function serializeProjectStats(
  tasks: Array<{
    kind: string;
    status: string;
  }>,
) {
  const stats = {
    total: tasks.length,
    kinds: {
      milestone: 0,
      task: 0,
      total: tasks.length,
    },
    states: {
      scheduled: 0,
      completed: 0,
      archived: 0,
    },
  };

  for (const task of tasks) {
    if (task.kind === "milestone") {
      stats.kinds.milestone += 1;
    }

    if (task.kind === "task") {
      stats.kinds.task += 1;
    }

    if (task.status === "scheduled" || task.status === "completed" || task.status === "archived") {
      stats.states[task.status] += 1;
    }
  }

  return stats;
}

function serializeProject(project: {
  id: string;
  name: string;
  slug: string;
  goal: string;
  shouldbe: string | null;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  startingAt: Date | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  tasks?: Array<{ kind: string; status: string }>;
}) {
  return {
    id: project.id,
    name: project.name,
    slug: project.slug,
    goal: project.goal,
    shouldbe: project.shouldbe,
    color: null,
    stats: serializeProjectStats(project.tasks ?? []),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    deadline: project.deadline,
    startingAt: project.startingAt,
    startedAt: project.startedAt,
    finishedAt: project.finishedAt,
  };
}

type SerializableTask = {
  id: string;
  title: string;
  description: string;
  kind: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  startedAt: Date | null;
  archivedAt: Date | null;
  startingAt: Date | null;
  deadline: Date;
  project?: {
    id: string;
    name: string;
    slug: string;
    goal: string;
    shouldbe: string | null;
    createdAt: Date;
    updatedAt: Date;
    deadline: Date;
    startingAt: Date | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    tasks?: Array<{ kind: string; status: string }>;
  };
  parent?: SerializableTask | null;
  children?: SerializableTask[];
};

function serializeTask(task: SerializableTask): Record<string, unknown> {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    finishedAt: task.finishedAt,
    startedAt: task.startedAt,
    archivedAt: task.archivedAt,
    startingAt: task.startingAt,
    deadline: task.deadline,
    project: task.project ? serializeProject(task.project) : undefined,
    parent: task.parent ? serializeTask(task.parent) : null,
    children: task.children?.map(serializeTask) ?? [],
  };
}

router.get("/users/me", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.currentUserId },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/projects", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const limit = toPositiveInt(req.query.limit, 20);
    const page = toPositiveInt(req.query.page, 1);
    const skip = (page - 1) * limit;

    const [totalCount, projects] = await Promise.all([
      prisma.project.count({
        where: { userId: req.currentUserId },
      }),
      prisma.project.findMany({
        where: { userId: req.currentUserId },
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
        skip,
        take: limit,
      }),
    ]);

    res.json({
      data: projects.map(serializeProject),
      pageInfo: {
        totalCount,
        limit,
        page,
        hasNext: skip + projects.length < totalCount,
        hasPrevious: page > 1,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/projects/:slug", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const slug = String(req.params.slug);

    const project = await prisma.project.findFirst({
      where: {
        userId: req.currentUserId,
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

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json({
      data: serializeProject(project),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/tasks", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const limit = toPositiveInt(req.query.limit, 20);
    const page = toPositiveInt(req.query.page, 1);
    const skip = (page - 1) * limit;
    const statusQuery = req.query.status;
    const statuses = Array.isArray(statusQuery)
      ? statusQuery
      : typeof statusQuery === "string"
        ? statusQuery.split(",")
        : [];
    const filteredStatuses = statuses.filter(
      (status): status is TaskStatus =>
        status === "scheduled" || status === "completed" || status === "archived",
    );

    const where = {
      userId: req.currentUserId,
      ...(filteredStatuses.length > 0 ? { status: { in: filteredStatuses } } : {}),
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
        skip,
        take: limit,
      }),
    ]);

    res.json({
      data: tasks.map(serializeTask),
      pageInfo: {
        totalCount,
        limit,
        page,
        hasNext: skip + tasks.length < totalCount,
        hasPrevious: page > 1,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/users/tasks", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, kind, description, status, deadline, projectId, startingAt } = req.body ?? {};

    if (!title || !kind || !description || !status || !deadline || !projectId) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.currentUserId,
      },
    });

    if (!project) {
      res.status(400).json({ message: "Project not found" });
      return;
    }

    const task = await prisma.task.create({
      data: {
        userId: req.currentUserId!,
        projectId,
        title,
        kind,
        description,
        status,
        deadline: new Date(deadline),
        startingAt: toOptionalDate(startingAt),
        startedAt: status === "completed" ? new Date() : null,
        finishedAt: status === "completed" ? new Date() : null,
        archivedAt: status === "archived" ? new Date() : null,
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

    res.status(201).json({
      data: serializeTask(task),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/tasks/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const taskId = String(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.currentUserId,
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
        parent: true,
        children: true,
      },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({
      data: serializeTask(task),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/users/tasks/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const taskId = String(req.params.id);

    const currentTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.currentUserId,
      },
    });

    if (!currentTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const nextProjectId = req.body?.projectId;

    if (nextProjectId) {
      const project = await prisma.project.findFirst({
        where: {
          id: nextProjectId,
          userId: req.currentUserId,
        },
      });

      if (!project) {
        res.status(400).json({ message: "Project not found" });
        return;
      }
    }

    const nextStatus = req.body?.status ?? currentTask.status;
    const now = new Date();

    const task = await prisma.task.update({
      where: { id: currentTask.id },
      data: {
        title: req.body?.title ?? undefined,
        kind: req.body?.kind ?? undefined,
        description: req.body?.description ?? undefined,
        status: req.body?.status ?? undefined,
        projectId: req.body?.projectId ?? undefined,
        startingAt: toOptionalDate(req.body?.startingAt),
        deadline: req.body?.deadline ? new Date(req.body.deadline) : undefined,
        startedAt: nextStatus === "completed" && !currentTask.startedAt ? now : undefined,
        finishedAt: nextStatus === "completed" ? now : nextStatus === "scheduled" ? null : undefined,
        archivedAt: nextStatus === "archived" ? now : nextStatus !== "archived" ? null : undefined,
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
        parent: true,
        children: true,
      },
    });

    res.json({
      data: serializeTask(task),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/users/tasks/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const taskId = String(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.currentUserId,
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
        parent: true,
        children: true,
      },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await prisma.task.delete({
      where: { id: task.id },
    });

    res.json({
      data: serializeTask(task),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as usersRouter };
