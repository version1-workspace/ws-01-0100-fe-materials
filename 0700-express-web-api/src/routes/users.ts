import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { findProjectBySlug, findOwnedProject, listProjects } from "../models/project";
import {
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
  TaskStatus,
  updateTask,
} from "../models/task";
import { findUserProfile } from "../models/user";

const router = Router();

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

type SerializableProject = {
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

function serializeProject(project: SerializableProject) {
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
  status: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  startedAt: Date | null;
  archivedAt: Date | null;
  startingAt: Date | null;
  deadline: Date;
  project?: SerializableProject;
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
    const user = await findUserProfile(req.currentUserId!);

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
    const { totalCount, projects } = await listProjects({
      userId: req.currentUserId!,
      skip,
      take: limit,
    });

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
    const project = await findProjectBySlug(req.currentUserId!, String(req.params.slug));

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
    const { totalCount, tasks } = await listTasks({
      userId: req.currentUserId!,
      skip,
      take: limit,
      statuses: filteredStatuses,
    });

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

    const project = await findOwnedProject(req.currentUserId!, String(projectId));

    if (!project) {
      res.status(400).json({ message: "Project not found" });
      return;
    }

    const task = await createTask({
      userId: req.currentUserId!,
      projectId: String(projectId),
      title: String(title),
      kind: String(kind),
      description: String(description),
      status: String(status),
      deadline: new Date(String(deadline)),
      startingAt: toOptionalDate(startingAt),
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
    const task = await findTaskById(req.currentUserId!, String(req.params.id));

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
    const currentTask = await findTaskById(req.currentUserId!, taskId);

    if (!currentTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (req.body?.projectId) {
      const project = await findOwnedProject(req.currentUserId!, String(req.body.projectId));

      if (!project) {
        res.status(400).json({ message: "Project not found" });
        return;
      }
    }

    const task = await updateTask(taskId, currentTask.status, currentTask.startedAt, {
      title: req.body?.title,
      kind: req.body?.kind,
      description: req.body?.description,
      status: req.body?.status,
      projectId: req.body?.projectId,
      startingAt: toOptionalDate(req.body?.startingAt),
      deadline: req.body?.deadline ? new Date(req.body.deadline) : undefined,
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
    const task = await findTaskById(req.currentUserId!, String(req.params.id));

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await deleteTask(task.id);

    res.json({
      data: serializeTask(task),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as usersRouter };
